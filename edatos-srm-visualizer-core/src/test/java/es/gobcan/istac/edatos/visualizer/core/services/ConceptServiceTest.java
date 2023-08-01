package es.gobcan.istac.edatos.visualizer.core.services;

import static org.mockito.Mockito.mock;

import java.util.List;
import java.util.Optional;

import org.junit.Test;
import org.mockito.Mockito;

import es.gobcan.istac.edatos.visualizer.core.models.TreeNode;
import es.gobcan.istac.edatos.visualizer.core.repository.ConceptRepository;

public class ConceptServiceTest {

    private final ConceptRepository mockConceptRepository = mock(ConceptRepository.class);
    private final ConceptService    conceptService        = new ConceptService(mockConceptRepository);

    @Test
    public void should_return_empty_when_concepts_does_not_exist() {
        Mockito.when(mockConceptRepository.findConcepts(Mockito.anyString())).thenReturn(Optional.empty());
        String urn = "urn:sdmx:org.sdmx.infomodel.codelist.Codelist=ESTATXX:CL_SEX(1.1)";

        List<TreeNode> result = conceptService.findConceptsFromScheme(urn,"es");

        assert result.isEmpty();
    }

}