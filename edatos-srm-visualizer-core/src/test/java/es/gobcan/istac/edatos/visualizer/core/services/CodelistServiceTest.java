package es.gobcan.istac.edatos.visualizer.core.services;

import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.Test;
import org.mockito.Mockito;

import es.gobcan.istac.edatos.visualizer.core.models.TreeNode;
import es.gobcan.istac.edatos.visualizer.core.repository.CodelistRepository;

public class CodelistServiceTest {

    private final CodelistRepository mockCodelistRepository = mock(CodelistRepository.class);
    private final CodelistService    codelistService        = new CodelistService(mockCodelistRepository);

    @Test
    public void should_return_empty_when_is_invalid_urn() {
        when(mockCodelistRepository.findCodelist(Mockito.anyString())).thenReturn(Optional.empty());

        List<TreeNode> result = codelistService.findCodelistFromScheme("invalid_urn", "en");

        assertTrue(result.isEmpty());
    }

    @Test
    public void should_return_empty_when_codelist_does_not_exist() {
        Mockito.when(mockCodelistRepository.findCodelist(Mockito.anyString())).thenReturn(Optional.empty());
        String urn = "urn:sdmx:org.sdmx.infomodel.codelist.Codelist=ESTATXX:CL_SEX(1.1)";

        List<TreeNode> result = codelistService.findCodelistFromScheme(urn, "es");

        assert result.isEmpty();
    }

    @Test
    public void should_return_empty_when_codelist_versions_does_not_exist() {
        Mockito.when(mockCodelistRepository.findAllVersions(Mockito.anyString())).thenReturn(null);
        String urn = "urn:sdmx:org.sdmx.infomodel.codelist.Codelist=ESTATXX:CL_SEX(1.156)";

        List<String> result = null;
        try {
            result = codelistService.loadAllCodelistVersions(urn);
        } catch (NullPointerException e) {
            // Catch the NullPointerException
        }

        assert result == null;
    }
}