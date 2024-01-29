package com.velog.velog_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.bind.annotation.CrossOrigin;

@EnableJpaAuditing
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@CrossOrigin(origins = "http://localhost:3000")
@ServletComponentScan
public class VelogBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(VelogBackendApplication.class, args);
	}

}
