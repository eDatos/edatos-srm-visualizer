package es.gobcan.istac.edatos.visualizer.core.models;

import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.siemac.edatos.core.common.exception.EDatosException;

public class UrnTest {

    private final Urn urnValues = new Urn("urn:sdmx:org.sdmx.infomodel.categoryscheme.Category=ISTAC:TEMAS_CANARIAS(01.001).010.010_020.010_020_020");

    @Test
    public void should_throw_an_exception_when_urn_is_not_valid() {
        Assertions.assertThatThrownBy(() -> new Urn("invalid")).isInstanceOf(IllegalArgumentException.class).hasMessage("URN does not have a valid format");
    }

    @Test
    public void should_return_agency_when_urn_is_valid() {
        Assertions.assertThat(urnValues.getAgency()).isEqualTo("ISTAC");
    }


    @Test
    public void should_return_scheme_when_urn_is_valid() {
        Assertions.assertThat(urnValues.getScheme()).isEqualTo("TEMAS_CANARIAS");
    }


    @Test
    public void should_return_version_when_urn_is_valid() {
        Assertions.assertThat(urnValues.getVersion()).isEqualTo("01.001");
    }


    @Test
    public void should_return_id_when_urn_is_valid() {
        Assertions.assertThat(urnValues.getId()).isEqualTo("010.010_020.010_020_020");
    }

}