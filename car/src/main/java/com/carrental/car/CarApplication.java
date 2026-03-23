package com.carrental.car;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CarApplication {

	public static void main(String[] args) {

		Dotenv dotenv = Dotenv.configure()
				.ignoreIfMissing()
				.load();

		setIfPresent("DB_URL", dotenv);
		setIfPresent("JWT_SECRET", dotenv);
		setIfPresent("CLOUDINARY_URL", dotenv);

		SpringApplication.run(CarApplication.class, args);
	}

	private static void setIfPresent(String key, Dotenv dotenv) {
		String value = dotenv.get(key);
		if (value != null && !value.isEmpty()) {
			System.setProperty(key, value);
		} else {
			System.out.println("⚠️ Missing ENV: " + key);
		}
	}
}