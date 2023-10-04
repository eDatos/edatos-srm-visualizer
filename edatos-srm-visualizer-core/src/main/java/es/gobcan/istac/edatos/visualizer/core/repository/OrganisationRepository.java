package es.gobcan.istac.edatos.visualizer.core.repository;

import java.util.Optional;

import org.siemac.metamac.rest.structural_resources.v1_0.domain.OrganisationSchemes;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.Organisations;

public interface OrganisationRepository {

    Optional<Organisations> findOrganisations(String urn);

    Optional<OrganisationSchemes> findAllVersions(String urn);

}
