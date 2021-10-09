import com.casper.sdk.CasperSdk;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.logging.Level;
import java.util.logging.Logger;

public class NodePeers {

    public static final Logger LOGGER = Logger.getLogger(NodePeers.class.getName());

    public static final String DEPLOY_HASH = "6c4048f8ebd40a160e9df47e73680eda8ae8430309a9566655bb357a5967276b";

    public static String prettyPrintJson(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Object object = objectMapper.readValue(jsonString, Object.class);
        return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(object);
    }

    public static void main(String[] args) {

        CasperSdk casperSdk = new CasperSdk("http://3.136.227.9", 7777);

        try {
            String nodePeers = casperSdk.getNodePeers();
            LOGGER.log(Level.INFO, NodePeers.prettyPrintJson(nodePeers));
        } catch ( Throwable exp ){
            LOGGER.log(Level.SEVERE, "Exception while fetching node peers", exp);
        }
    }

}
