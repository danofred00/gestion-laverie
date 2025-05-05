package cm.group.gestion_laverie.config;

import java.util.logging.Logger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.io.ClassPathResource;

@Configuration
public class AppConfig {
    static Logger logger = Logger.getLogger(AppConfig.class.getName());

    @Bean
    public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {

        logger.info("Starting PropertySourcesPlaceholderConfigurer ...");

        PropertySourcesPlaceholderConfigurer configurer = new PropertySourcesPlaceholderConfigurer();
        configurer.setLocation(new ClassPathResource(".env"));
        configurer.setIgnoreResourceNotFound(false);

        logger.info("Configuring PropertySourcesPlaceholderConfigurer with .env file");
        return configurer;
    }
}
