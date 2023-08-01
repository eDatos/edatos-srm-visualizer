package es.gobcan.istac.edatos.visualizer.core.services;

import java.util.ArrayList;
import java.util.List;

import org.siemac.metamac.rest.common.v1_0.domain.Resource;
import org.siemac.metamac.rest.structural_resources.v1_0.domain.DataStructures;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.gobcan.istac.edatos.visualizer.core.models.Urn;
import es.gobcan.istac.edatos.visualizer.core.repository.DataStructureRepository;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class DataStructureService {

    private final DataStructureRepository dataStructureRepository;

    @Autowired
    public DataStructureService(DataStructureRepository dataStructureRepository) {
        this.dataStructureRepository = dataStructureRepository;
    }

    public List<String> loadAllDataStructureVersions(String urn) {
        log.debug("Search soon {}", urn);
        DataStructures schemes = dataStructureRepository.findAllVersions(urn).orElse(new DataStructures());
        List<String> versions = new ArrayList<>();
        for (Resource resource : schemes.getDataStructures()) {
            Urn urnValues = new Urn(resource.getUrn());
            if (!urn.contains(urnValues.getVersion())) {
                versions.add(urnValues.getVersion());
            }
        }
        return versions;
    }

}
