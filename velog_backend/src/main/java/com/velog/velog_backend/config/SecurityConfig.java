package com.velog.velog_backend.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.velog.velog_backend.jwt.JwtDTO;
import com.velog.velog_backend.jwt.JwtService;
import com.velog.velog_backend.member.repository.MemberRepository;
import com.velog.velog_backend.member.domain.Member;
import com.velog.velog_backend.jwt.JwtAuthorizationFilter;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

/*
이 파일(SecurityConfig.java)은 Spring Boot 애플리케이션의 보안 관련 설정을 담고 있는 Java 설정 클래스이다.
@Configuration 어노테이션이 클래스에 붙어 있어서, 스프링 프레임워크는 이 클래스를 구성(Configuration) 클래스로 인식하고
 애플리케이션 컨텍스트가 초기화될 때 해당 설정을 로드한다.
 */


@Slf4j
@Configuration
@EnableWebSecurity
/*
@EnableWebSecurity 어노테이션은 Spring Security를 활성화하고 웹 보안을 설정하는 데 사용된다.
이 어노테이션이 붙어있는 클래스에서는 HttpSecurity를 통해 다양한 보안 관련 설정을 커스터마이즈할 수 있다.
 */
@RequiredArgsConstructor
public class SecurityConfig {

    private final MemberRepository memberRepository;
    private final JwtService jwtService;

    @Value("${spring.web.cors.allowed-origins}")
    private String client;

    @Bean
    /*
    스프링 애플리케이션이 시작될 때,
    스프링 컨테이너는 @Configuration 클래스를 로드하고 @Bean으로 정의된 메소드를 실행하여 스프링 빈을 생성하고 관리한다.
     */
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        /*
        filterChain(HttpSecurity http) 메소드는 HTTP 요청에 대한 보안 처리를 설정하는 보안 필터 체인을 정의한다.
        이 설정은 웹 요청이 들어올 때마다 적용되어 요청의 인증과 권한 부여를 처리한다.
         */
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        authz ->
                                authz
                                        .requestMatchers(CorsUtils::isPreFlightRequest)
                                        .permitAll()
                                        .requestMatchers(HttpMethod.GET, "/posts/**", "/users/validation")
                                        .permitAll()
                                        .requestMatchers(HttpMethod.GET, "/major", "/keyword")
                                        .permitAll()
                                        .requestMatchers(HttpMethod.GET, "/favicon.ico")
                                        .permitAll()
                                        .requestMatchers(HttpMethod.GET, "/nickname")
                                        .permitAll()
                                        .anyRequest()
                                        .authenticated())
                .oauth2Login(
                        oauth2 ->
                                oauth2
                                        .userInfoEndpoint(userInfo -> userInfo.userService(this.oAuth2UserService()))
                                        .successHandler(this.oAuth2SuccessHandler()))
                .addFilterBefore(this.jwtAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(config -> config.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(
                        handler -> handler.authenticationEntryPoint(this.oAuth2AuthenticationEntryPoint()));
        return http.build();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(client));
        config.setAllowedMethods(Arrays.asList("POST", "GET", "PUT", "DELETE"));
        config.setAllowedHeaders(Arrays.asList(HttpHeaders.AUTHORIZATION, HttpHeaders.CONTENT_TYPE));
        config.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public JwtAuthorizationFilter jwtAuthorizationFilter() {
        return new JwtAuthorizationFilter(jwtService);
    }

    private AuthenticationEntryPoint oAuth2AuthenticationEntryPoint() {
        return (request, response, authException) -> {
            // 로그에 에러 메시지와 스택 트레이스를 기록
            //401 에러 해결: url문제였음
            log.error("Authentication error: " + authException.getMessage());
            log.error("Stack Trace: ", authException);

            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
        };
    }

    private AuthenticationSuccessHandler oAuth2SuccessHandler() {
        log.info("SecurityConfig.oAuth2SuccessHandler 실행");
        final DefaultRedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

        return (request, response, authentication) -> {
            OAuth2User userinfo = (OAuth2User) authentication.getPrincipal();
            String email = userinfo.getAttribute("email");

            String accessToken = jwtService.generateToken(email);
            Member member = memberRepository.findByEmail(email).orElseThrow();

            String targetUrl =
                    UriComponentsBuilder.fromUriString(client)
                            .path("/oauth2/redirect")
                            .queryParam("token", accessToken)
                            .build()
                            .toUriString();
            log.info(targetUrl); // 리디랙션 url 확인
            redirectStrategy.sendRedirect(request, response, targetUrl);
        };
    }

    // dto로 보내기
//    private AuthenticationSuccessHandler oAuth2SuccessHandler() {
//        return (request, response, authentication) -> {
//            OAuth2User userinfo = (OAuth2User) authentication.getPrincipal();
//            String email = userinfo.getAttribute("email");
//
//            String accessToken = jwtService.generateToken(email);
//
//            JwtDTO jwtDTO = new JwtDTO(accessToken);
//
//            // 응답 설정 및 JSON으로 변환하여 응답 본문에 쓰기
//            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//            new ObjectMapper().writeValue(response.getOutputStream(), jwtDTO);
//        };
//    }

    private OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService() {
        log.info("SecurityConfig.oAuth2UserService 실행");
        final DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();

        return userRequest -> {
            OAuth2User oAuth2User = delegate.loadUser(userRequest);
            Optional<Member> registered = memberRepository.findByUid(oAuth2User.getName());

            if (registered.isEmpty()) {
                Member member =
                        Member.builder()
                                .uid(oAuth2User.getAttribute("sub"))
                                .email(oAuth2User.getAttribute("email"))
                                .pictureUrl(oAuth2User.getAttribute("picture"))
                                .nickname(oAuth2User.getAttribute("name"))
                                .build();
                memberRepository.save(member);
            }
            return oAuth2User;
        };
    }

    // In development only
//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer() {
//        return web -> web.ignoring().requestMatchers(new AntPathRequestMatcher("/h2-console/**"));
//    }
}

