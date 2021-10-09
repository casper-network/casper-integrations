import com.casper.sdk.CasperSdk;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.logging.Level;
import java.util.logging.Logger;

public class DeployInfo {

    public static final Logger LOGGER = Logger.getLogger(DeployInfo.class.getName());

    public static final String DEPLOY_HASH = "6c4048f8ebd40a160e9df47e73680eda8ae8430309a9566655bb357a5967276b";

    public static String prettyPrintJson(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Object object = objectMapper.readValue(jsonString, Object.class);
        return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(object);
    }

    public static void main(String[] args) {

        CasperSdk casperSdk = new CasperSdk("http://3.136.227.9", 7777);

        try {
            String deployInfo = casperSdk.getDeployInfo(DEPLOY_HASH);
            LOGGER.log(Level.INFO, DeployInfo.prettyPrintJson(deployInfo));
        } catch ( Throwable exp ){
            LOGGER.log(Level.SEVERE, "Exception while fetching deploy information", exp);
        }
    }

}
