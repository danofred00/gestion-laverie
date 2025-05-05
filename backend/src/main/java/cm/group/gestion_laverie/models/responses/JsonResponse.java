package cm.group.gestion_laverie.models.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class JsonResponse {
    
   /**
     * Message to be displayed to the user
     */
    protected String message;

    /**
     * HTTP status code
     */
    @Builder.Default
    protected int code = 200;
    
    /**
     * Error code
     */
    @Builder.Default
    protected String status = "OK";

    /**
     * Data to display
     */
    @Builder.Default
    protected Object data  = null;
}
