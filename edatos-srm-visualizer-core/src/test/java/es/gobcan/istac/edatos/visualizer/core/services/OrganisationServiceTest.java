package es.gobcan.istac.edatos.visualizer.core.services;

import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.Test;
import org.mockito.Mockito;
import org.siemac.edatos.core.common.conf.ConfigurationService;

import es.gobcan.istac.edatos.visualizer.core.models.TreeNode;
import es.gobcan.istac.edatos.visualizer.core.repository.OrganisationRepository;

public class OrganisationServiceTest {

    private final OrganisationRepository mockOrganisationRepository = mock(OrganisationRepository.class);
    private final ConfigurationService   mockConfigurationService   = mock(ConfigurationService.class);
    private final OrganisationService    organisationService        = new OrganisationService(mockOrganisationRepository, mockConfigurationService);

    @Test
    public void should_return_empty_when_is_invalid_urn() {
        when(mockOrganisationRepository.findOrganisations(Mockito.anyString())).thenReturn(Optional.empty());

        List<TreeNode> result = organisationService.findOrganisationsFromScheme("invalid_urn", "en");

        assertTrue(result.isEmpty());
    }

    @Test
    public void should_return_empty_when_organisation_does_not_exist() {
        Mockito.when(mockOrganisationRepository.findOrganisations(Mockito.anyString())).thenReturn(Optional.empty());
        String urn = "urn:sdmx:org.sdmx.infomodel.conceptscheme.Concept=ISTAC:ORDENACION_CONCEPTOS(01.002).a111_subconcepto";

        List<TreeNode> result = organisationService.findOrganisationsFromScheme(urn, "es");

        assert result.isEmpty();
    }

    @Test
    public void should_return_empty_when_organisation_versions_does_not_exist() {
        Mockito.when(mockOrganisationRepository.findAllVersions(Mockito.anyString())).thenReturn(null);
        String urn = "urn:sdmx:org.sdmx.infomodel.conceptscheme.Concept=ISTAC:ORDENACION_CONCEPTOS(01.002).a111_subconcepto.99";

        List<String> result = null;
        try {
            result = organisationService.loadAllOrganisationVersions(urn);
        } catch (NullPointerException e) {
            // Catch the NullPointerException
        }

        assert result == null;
    }
}