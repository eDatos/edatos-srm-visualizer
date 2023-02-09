package es.gobcan.istac.edatos.visualizer.core.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

@Configuration
public class WebStaticConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        Resource requestedResource = location.createRelative(resourcePath);
                        return requestedResource.exists() && requestedResource.isReadable() ? requestedResource
                                : new ClassPathResource("/static/index.html");
                    }
                });
    }

//        registry.addResourceHandler("/**/authentication.js")
//                .addResourceLocations("classpath:/static/")
//                .resourceChain(true)
//                .addResolver(new PathResourceResolver() {
//                    @Override
//                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
//                        System.out.println(" JS -> " + resourcePath);
//                        Resource requestedResource = location.createRelative(resourcePath);
//                        System.out.println(" JS requestedResource -> " + requestedResource);
//                        System.out.println("  JS location -> " + location);
//                        return requestedResource.exists() && requestedResource.isReadable() ? requestedResource : new ClassPathResource("/static/assets/");
//                    }
//                });
//        registry.addResourceHandler("/**/*")
//                .addResourceLocations("classpath:/static/")
//                .resourceChain(true)
//                .addResolver(new PathResourceResolver() {
//                    @Override
//                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
//                        System.out.println(" JS -> " + resourcePath);
//                        Resource requestedResource = location.createRelative(resourcePath);
//                        System.out.println(" JS requestedResource -> " + requestedResource);
//                        System.out.println("  JS location -> " + location);
//                        return requestedResource.exists() && requestedResource.isReadable() ? requestedResource : new ClassPathResource("/static/");
//                    }
//                });
//        registry.addResourceHandler("**/api/**")
//                .addResourceLocations("classpath:/static/")
//                .resourceChain(true)
//                .addResolver(new PathResourceResolver() {
//                    @Override
//                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
//                        System.out.println(" api-> " + resourcePath);
//                        Resource requestedResource = location.createRelative(resourcePath);
//                        System.out.println(" api requestedResource -> " + requestedResource);
//                        System.out.println(" api location -> " + location);
//                        return requestedResource.exists() && requestedResource.isReadable() ? requestedResource : new ClassPathResource("/api/");
//                    }
//                });
//        registry.addResourceHandler("/**/*")
//                .addResourceLocations("classpath:/static/")
//                .resourceChain(true)
//                .addResolver(new PathResourceResolver() {
//                    @Override
//                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
//                        System.out.println("HTML -> " + resourcePath);
//                        Resource requestedResource = location.createRelative(resourcePath);
//                        System.out.println("HTML requestedResource -> " + requestedResource);
//                        System.out.println("HTML location -> " + location);
//                        return requestedResource.exists() && requestedResource.isReadable() ? requestedResource : new ClassPathResource("/static/index.html");
//                    }
//                });

}
