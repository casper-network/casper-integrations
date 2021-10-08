import com.casper.sdk.controller.CasperSdk;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.logging.Level;
import java.util.logging.Logger;

public class EraInfo {

    public static final Logger LOGGER = Logger.getLogger(EraInfo.class.getName());

    public static final String DEPLOY_HASH = "6c4048f8ebd40a160e9df47e73680eda8ae8430309a9566655bb357a5967276b";

    public static String prettyPrintJson(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Object object = objectMapper.readValue(jsonString, Object.class);
        return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(object);
    }

    public static void main(String[] args) {

        CasperSdk casperSdk = new CasperSdk("http://3.136.227.9", "7777");

        try {
            String eraInfoBySwitchBlock = casperSdk.getEraInfoBySwitchBlock();
            LOGGER.log(Level.INFO, EraInfo.prettyPrintJson(eraInfoBySwitchBlock));
        } catch ( Throwable exp ){
            LOGGER.log(Level.SEVERE, "Exception while fetching era info", exp);
        }
    }

}
