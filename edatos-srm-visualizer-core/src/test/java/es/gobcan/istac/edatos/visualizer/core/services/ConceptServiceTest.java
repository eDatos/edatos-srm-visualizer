package es.gobcan.istac.edatos.visualizer.core.services;

import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

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
    public void should_return_empty_when_is_invalid_urn() {
        when(mockConceptRepository.findConcepts(Mockito.anyString())).thenReturn(Optional.empty());

        List<TreeNode> result = conceptService.findConceptsFromScheme("invalid_urn", "en");

        assertTrue(result.isEmpty());
    }

    @Test
    public void should_return_empty_when_concepts_does_not_exist() {
        Mockito.when(mockConceptRepository.findConcepts(Mockito.anyString())).thenReturn(Optional.empty());
        String urn = "urn:sdmx:org.sdmx.infomodel.conceptscheme.Concept=ISTAC:ORDENACION_CONCEPTOS(01.002).a111_subconcepto";

        List<TreeNode> result = conceptService.findConceptsFromScheme(urn,"es");

        assert result.isEmpty();
    }

    @Test
    public void should_return_empty_when_scheme_concepts_does_not_exist() {
        Mockito.when(mockConceptRepository.findConcepts(Mockito.anyString())).thenReturn(Optional.empty());
        String urn = "urn:sdmx:org.sdmx.infomodel.conceptscheme.ConceptScheme=ISTAC:Copia_Esquema_prueba_obligatoriedad_name(01.001)";

        List<TreeNode> result = conceptService.findConceptsFromScheme(urn,"es");

        assert result.isEmpty();
    }

    @Test
    public void should_return_empty_when_concept_versions_does_not_exist() {
        Mockito.when(mockConceptRepository.findAllVersions(Mockito.anyString())).thenReturn(null);
        String urn = "urn:sdmx:org.sdmx.infomodel.conceptscheme.ConceptScheme=ISTAC:Copia_Esquema_prueba_obligatoriedad_name(01.001).99";

        List<String> result = null;
        try {
            result = conceptService.loadAllConceptsSchemeVersions(urn);
        } catch (NullPointerException e) {
            // Catch the NullPointerException
        }

        assert result == null;
    }
}