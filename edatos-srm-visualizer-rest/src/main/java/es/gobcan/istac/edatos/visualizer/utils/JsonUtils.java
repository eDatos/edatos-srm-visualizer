package es.gobcan.istac.edatos.visualizer.utils;

import java.util.Collection;
import java.util.List;

import com.google.gson.Gson;

import es.gobcan.istac.edatos.visualizer.core.models.TreeNode;

public class JsonUtils {

    private JsonUtils() {}

    public static <T> String toJson(Collection<T> list) {
        Gson gson = new Gson();
        return gson.toJson(list);
    }

}
