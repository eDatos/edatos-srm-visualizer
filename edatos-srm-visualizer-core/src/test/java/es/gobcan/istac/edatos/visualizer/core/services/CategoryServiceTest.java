package es.gobcan.istac.edatos.visualizer.core.services;

import static org.junit.Assert.*;
import static org.mockito.Mockito.mock;

import java.util.List;
import java.util.Optional;

import org.junit.Test;
import org.mockito.Mockito;

import es.gobcan.istac.edatos.visualizer.core.models.TreeNode;
import es.gobcan.istac.edatos.visualizer.core.repository.CategoryRepository;


public class CategoryServiceTest {

    private final CategoryRepository mockCategoryRepository = mock(CategoryRepository.class);
    private final     CategoryService    categoryService        = new CategoryService(mockCategoryRepository);

    @Test
    public void should_return_empty_when_category_does_not_exist() {
        Mockito.when(mockCategoryRepository.findCategories(Mockito.anyString())).thenReturn(Optional.empty());
        String urn = "urn:sdmx:org.sdmx.infomodel.categoryscheme.Category=ISTAC:TEMAS_CANARIAS(01.001).0";

        List<TreeNode> result = categoryService.findCategoriesFromScheme(urn,"es");

        assert result.isEmpty();
    }

    @Test
    public void loadChildren() {}

    @Test
    public void loadAllCategorySchemeVersions() {}
}