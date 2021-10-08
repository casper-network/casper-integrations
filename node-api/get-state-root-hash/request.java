import com.casper.sdk.controller.CasperSdk;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.logging.Level;
import java.util.logging.Logger;

public class StateRootHash {

    public static final Logger LOGGER = Logger.getLogger(StateRootHash.class.getName());

    public static String prettyPrintJson(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Object object = objectMapper.readValue(jsonString, Object.class);
        return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(object);
    }

    public static void main(String[] args) {

        CasperSdk casperSdk = new CasperSdk("http://3.136.227.9", "7777");

        try {
            String stateRootHash = casperSdk.getStateRootHash();
            LOGGER.log(Level.INFO, "State Root Hash is: " + stateRootHash);
        } catch ( Throwable exp ){
            LOGGER.log(Level.SEVERE, "Exception while fetching state root hash", exp);
        }
    }

}
