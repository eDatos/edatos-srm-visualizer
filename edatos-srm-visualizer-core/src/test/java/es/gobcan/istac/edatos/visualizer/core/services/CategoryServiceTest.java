package es.gobcan.istac.edatos.visualizer.core.services;

import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.Test;
import org.mockito.Mockito;
import org.siemac.edatos.core.common.conf.ConfigurationService;

import es.gobcan.istac.edatos.visualizer.core.models.TreeNode;
import es.gobcan.istac.edatos.visualizer.core.repository.CategoryRepository;

public class CategoryServiceTest {

    private final CategoryRepository   mockCategoryRepository   = mock(CategoryRepository.class);
    private final ConfigurationService mockConfigurationService = mock(ConfigurationService.class);
    private final CategoryService      categoryService          = new CategoryService(mockCategoryRepository, mockConfigurationService);

    @Test
    public void should_return_empty_when_is_invalid_urn() {
        when(mockCategoryRepository.findCategories(anyString())).thenReturn(Optional.empty());

        List<TreeNode> result = categoryService.findCategoriesFromScheme("invalid_urn", "en");

        assertTrue(result.isEmpty());
    }

    @Test
    public void should_return_empty_when_category_does_not_exist() {
        when(mockCategoryRepository.findCategories(anyString())).thenReturn(Optional.empty());
        String urn = "urn:sdmx:org.sdmx.infomodel.categoryscheme.Category=ISTAC:TEMAS_CANARIAS(01.001).0";

        List<TreeNode> result = categoryService.findCategoriesFromScheme(urn, "es");

        assert result.isEmpty();
    }

    @Test
    public void should_return_empty_when_category_versions_does_not_exist() {
        Mockito.when(mockCategoryRepository.findAllVersions(Mockito.anyString())).thenReturn(null);
        String urn = "urn:sdmx:org.sdmx.infomodel.categoryscheme.Category=ISTAC:TEMAS_CANARIAS(01.001).99";

        List<String> result = null;
        try {
            result = categoryService.loadAllCategorySchemeVersions(urn);
        } catch (NullPointerException e) {
            // Catch the NullPointerException
        }

        assert result == null;
    }

}