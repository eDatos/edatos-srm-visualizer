package es.gobcan.istac.edatos.visualizer.core.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.siemac.edatos.core.common.conf.ConfigurationService;
import org.siemac.metamac.rest.common.v1_0.domain.Resource;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.Categories;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.CategorySchemes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.gobcan.istac.edatos.visualizer.core.comparator.VersionDescendentComparator;
import es.gobcan.istac.edatos.visualizer.core.models.TreeNode;
import es.gobcan.istac.edatos.visualizer.core.models.Urn;
import es.gobcan.istac.edatos.visualizer.core.repository.CategoryRepository;
import es.gobcan.istac.edatos.visualizer.core.utils.InternationalStringUtils;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    private ConfigurationService     configurationService;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<TreeNode> findCategoriesFromScheme(String urn, String lang) {
        List<TreeNode> result = new ArrayList<>();
        Categories categories = categoryRepository.findCategories(urn).orElse(new Categories());
        String languageDefault = configurationService.retrieveLanguageDefault();

        Map<String, TreeNode> categoryToTreeNodeMap = new HashMap<>();

        categories.getCategories().forEach(category -> {
            TreeNode treeNode = new TreeNode(category.getUrn(), InternationalStringUtils.loadInternationalString(category.getName().getTexts(), lang, languageDefault));
            categoryToTreeNodeMap.put(category.getUrn(), treeNode);
        });

        categories.getCategories().forEach(category -> {
            TreeNode treeNode = categoryToTreeNodeMap.get(category.getUrn());

            if (category.getParent() != null) {
                TreeNode parentTreeNode = categoryToTreeNodeMap.get(category.getParent());
                if (parentTreeNode != null) {
                    parentTreeNode.getChildren().add(treeNode);
                }
            } else {
                result.add(treeNode);
            }
        });

        return result;
    }

    public List<String> loadAllCategorySchemeVersions(String urn) {
        log.debug("Search soon {}", urn);
        CategorySchemes schemes = categoryRepository.findAllVersions(urn).orElse(new CategorySchemes());
        List<String> versions = new ArrayList<>();
        for (Resource resource : schemes.getCategorySchemes()) {
            Urn urnValues = new Urn(resource.getUrn());
            versions.add(urnValues.getVersion());
        }

        Collections.sort(versions, new VersionDescendentComparator());

        return versions;
    }

}
