package es.gobcan.istac.edatos.visualizer.rest.controllers;


import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class TreeNode {
    String name;
    String id;
    String urn;
    Integer count;
    List<TreeNode> children = new ArrayList();
    String version;
    String urlChildrens;

    public TreeNode(String urn, String name) {
        // sdmx:org.sdmx.infomodel.conceptscheme.Concept=ISTAC:ORDENACION_CONCEPTOS(01.000).a111_subconcepto
        this.name = name;
        this.id = urn.split("=")[1].split("\\)")[1].replace(".","");
        this.urn = urn;
        this.version = urn.split("=")[1].split("\\(")[1].split("\\)")[0];
    }
}
