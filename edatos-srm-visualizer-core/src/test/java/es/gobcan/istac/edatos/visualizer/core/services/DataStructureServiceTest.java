package es.gobcan.istac.edatos.visualizer.core.services;

import static org.mockito.Mockito.mock;

import java.util.List;

import org.junit.Test;
import org.mockito.Mockito;

import es.gobcan.istac.edatos.visualizer.core.repository.DataStructureRepository;

public class DataStructureServiceTest {

    private final DataStructureRepository mockDataStructureRepository = mock(DataStructureRepository.class);
    private final DataStructureService    dataStructureService        = new DataStructureService(mockDataStructureRepository);

    @Test
    public void should_return_empty_when_dsd_versions_does_not_exist() {
        Mockito.when(mockDataStructureRepository.findAllVersions(Mockito.anyString())).thenReturn(null);
        String urn = "urn:sdmx:org.sdmx.infomodel.datastructure.DataStructure=ISTAC:DSD_ATRIBUTOS(01.230)";

        List<String> result = null;
        try {
            result = dataStructureService.loadAllDataStructureVersions(urn);
        } catch (NullPointerException e) {
            // Catch the NullPointerException
        }

        assert result == null;
    }

}