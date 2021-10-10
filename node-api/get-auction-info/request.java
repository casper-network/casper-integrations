import com.casper.sdk.CasperSdk;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.logging.Level;
import java.util.logging.Logger;

public class AuctionInfo {

    public static final Logger LOGGER = Logger.getLogger(AuctionInfo.class.getName());

    public static String prettyPrintJson(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Object object = objectMapper.readValue(jsonString, Object.class);
        return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(object);
    }

    public static void main(String[] args) {

        CasperSdk casperSdk = new CasperSdk("http://3.136.227.9", 7777);

        try {
            String auctionInfo = casperSdk.getAuctionInfo();
            LOGGER.log(Level.INFO, AuctionInfo.prettyPrintJson(auctionInfo));
        } catch ( Throwable exp ){
            LOGGER.log(Level.SEVERE, "Exception while fetching auction information", exp);
        }
    }

}
