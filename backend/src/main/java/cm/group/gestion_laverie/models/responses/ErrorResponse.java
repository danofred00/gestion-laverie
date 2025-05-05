package cm.group.gestion_laverie.models.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
@AllArgsConstructor
public class ErrorResponse {

   /**
     * Message to be displayed to the user
     */
    protected String message;

    /**
     * HTTP status code
     */
    protected int code;
    
    /**
     * Error code
     */
    protected String status;
}
