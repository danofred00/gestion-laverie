package cm.group.gestion_laverie.handlers;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import cm.group.gestion_laverie.exceptions.ResourceNotFoundException;
import cm.group.gestion_laverie.models.responses.ErrorResponse;
import cm.group.gestion_laverie.models.responses.JsonResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<JsonResponse> handleResourceNotFound(ResourceNotFoundException ex) {
        JsonResponse response = new JsonResponse(
            ex.getMessage(),
            HttpStatus.NOT_FOUND.value(),
            "NOT_FOUND",
            null
        );
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<JsonResponse> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        JsonResponse response = new JsonResponse(
            ex.getMessage(),
            HttpStatus.BAD_REQUEST.value(),
            "BAD_REQUEST",
            null
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleGenericException(Exception ex) {
        return new ErrorResponse(
            ex.getMessage(),
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "INTERNAL_SERVER_ERROR"
        );
    }
}