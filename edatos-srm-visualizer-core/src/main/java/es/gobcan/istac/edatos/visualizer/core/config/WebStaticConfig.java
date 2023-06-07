package es.gobcan.istac.edatos.visualizer.core.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

@Slf4j
@Configuration
public class WebStaticConfig implements WebMvcConfigurer {

    public static final String AUTHENTICATION_JS = "authentication.js";

    @Autowired
    private ServletContext servletContext;

    public static String baseRef;


    public WebStaticConfig() {
    }

    @PostConstruct
    public void buildContextPath () {
        WebStaticConfig.baseRef = servletContext.getContextPath();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {


        registry.addResourceHandler("/**/*.js", "/**/*.css")
                .addResourceLocations("classpath:/META-INF/resources/")
                .setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS))
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        Resource requestedResource = location.createRelative(resourcePath);
                        String[] urlSplit = resourcePath.split("/");
                        String filename = urlSplit[urlSplit.length - 1];
                        filename = AUTHENTICATION_JS.equals(filename) ? "assets/" + AUTHENTICATION_JS : filename;
                        return new ClassPathResource("/META-INF/resources/" + filename);
                    }
                });



        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/META-INF/resources/")
                .resourceChain(false)
                .addTransformer(new IndexPageTransformer ())
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        Resource requestedResource = location.createRelative(resourcePath);
                        return requestedResource.exists() && requestedResource.isReadable() ? requestedResource
                                : new ClassPathResource("/META-INF/resources/index.html");
                    }
                });

    }

}
