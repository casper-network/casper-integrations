import com.casper.sdk.controller.CasperSdk;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.logging.Level;
import java.util.logging.Logger;

public class NodeStatus {

    public static final Logger LOGGER = Logger.getLogger(NodeStatus.class.getName());

    public static String prettyPrintJson(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Object object = objectMapper.readValue(jsonString, Object.class);
        return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(object);
    }

    public static void main(String[] args) {

        CasperSdk casperSdk = new CasperSdk("http://3.136.227.9", "7777");

        try {
            String nodeStatus = casperSdk.getNodeStatus();
            LOGGER.log(Level.INFO, NodeStatus.prettyPrintJson(nodeStatus));
        } catch ( Throwable exp ){
            LOGGER.log(Level.SEVERE, "Exception while fetching era infonode status", exp);
        }
    }

}
