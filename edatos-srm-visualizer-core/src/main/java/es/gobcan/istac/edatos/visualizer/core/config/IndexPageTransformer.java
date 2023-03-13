package es.gobcan.istac.edatos.visualizer.core.config;


import org.apache.commons.io.IOUtils;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.resource.ResourceTransformer;
import org.springframework.web.servlet.resource.ResourceTransformerChain;
import org.springframework.web.servlet.resource.TransformedResource;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

import static java.nio.charset.StandardCharsets.UTF_8;


public class IndexPageTransformer implements ResourceTransformer {




    @Override
    public Resource transform(HttpServletRequest httpServletRequest, Resource resource, ResourceTransformerChain resourceTransformerChain) throws IOException {
        String html = IOUtils.toString(resource.getInputStream(), UTF_8);
        html = html.replace("<base href=\"/\">", "<base href=" + WebStaticConfig.baseRef + "/>");
        return new TransformedResource(resource, html.getBytes());
    }


}
