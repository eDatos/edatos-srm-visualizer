package es.gobcan.istac.edatos.visualizer.core.exceptions;

public class VisualizerRuntimeException extends RuntimeException{

    public VisualizerRuntimeException(String message) {
        super(message);
    }

    public VisualizerRuntimeException(String message, Exception ex) {
        super(message, ex);
    }
}
