package es.gobcan.istac.edatos.visualizer.core.comparator;

import java.util.Comparator;

public class VersionDescendentComparator implements Comparator<String> {
    @Override
    public int compare(String version1, String version2) {
        String[] parts1 = version1.split("\\.");
        String[] parts2 = version2.split("\\.");

        for (int i = 0; i < Math.min(parts1.length, parts2.length); i++) {
            int partComparison = Integer.compare(
                    Integer.parseInt(parts2[i]),
                    Integer.parseInt(parts1[i])
            );

            if (partComparison != 0) {
                return partComparison;
            }
        }

        return Integer.compare(parts2.length, parts1.length);
    }
}