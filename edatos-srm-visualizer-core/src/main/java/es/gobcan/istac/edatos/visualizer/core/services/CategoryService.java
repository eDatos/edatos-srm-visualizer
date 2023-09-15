package es.gobcan.istac.edatos.visualizer.core.services;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.siemac.metamac.rest.common.v1_0.domain.Resource;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.Categories;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.CategorySchemes;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.ItemResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.gobcan.istac.edatos.visualizer.core.comparator.VersionDescendentComparator;
import es.gobcan.istac.edatos.visualizer.core.models.TreeNode;
import es.gobcan.istac.edatos.visualizer.core.models.Urn;
import es.gobcan.istac.edatos.visualizer.core.repository.CategoryRepository;
import es.gobcan.istac.edatos.visualizer.core.utils.InternationalStringUtils;

import lombok.extern.slf4j.Slf4j;

@Service @Slf4j public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<TreeNode> findCategoriesFromScheme(String urn, String lang) {
        List<TreeNode> result = new ArrayList<>();
        Categories categories = categoryRepository.findCategories(urn).orElse(new Categories());
        categories.getCategories().forEach(category -> {
            TreeNode treeNode = new TreeNode(category.getUrn(), InternationalStringUtils.loadInternationalString(category.getName().getTexts(), lang));
            treeNode.getChildren().addAll(loadChildren(category.getUrn(), lang));
            result.add(treeNode);
        });
        return result;
    }

    public List<TreeNode> loadChildren(String urn, String lang) {
        log.debug("Search soon {}", urn);
        Categories categories = categoryRepository.findAllChildren(urn).orElse(new Categories());
        List<TreeNode> categoriesChildren = new ArrayList<>();
        if (categories.getTotal().compareTo(BigInteger.ZERO) > 0) {
            for (ItemResource bodyCategory : categories.getCategories()) {
                TreeNode treeNode = new TreeNode(bodyCategory.getUrn(), InternationalStringUtils.loadInternationalString(bodyCategory.getName().getTexts(), lang));
                treeNode.getChildren().addAll(loadChildren(treeNode.getUrn(), lang));
                categoriesChildren.add(treeNode);
            }
        }
        return categoriesChildren;
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
