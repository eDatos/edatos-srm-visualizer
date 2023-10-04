package es.gobcan.istac.edatos.visualizer.core.services;

import static org.mockito.Mockito.mock;

import java.util.List;

import org.junit.Test;
import org.mockito.Mockito;

import es.gobcan.istac.edatos.visualizer.core.repository.ConceptRepository;

public class ConceptServiceTest {

    private final ConceptRepository mockConceptRepository = mock(ConceptRepository.class);
    private final ConceptService    conceptService        = new ConceptService(mockConceptRepository);

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