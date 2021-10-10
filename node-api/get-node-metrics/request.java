import com.casper.sdk.CasperSdk;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.logging.Level;
import java.util.logging.Logger;

public class NodeMetrics {

    public static final Logger LOGGER = Logger.getLogger(NodeMetrics.class.getName());

    public static void main(String[] args) {

        CasperSdk casperSdk = new CasperSdk("http://3.136.227.9", 8888);

        try {
            String nodeMetrics = casperSdk.getNodeMetrics();
            LOGGER.log(Level.INFO, nodeMetrics);
        } catch ( Throwable exp ){
            LOGGER.log(Level.SEVERE, "Exception while fetching node metrics", exp);
        }
    }

}
