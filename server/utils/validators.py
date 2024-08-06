from flask import request, jsonify

def validate_registration_data():
    required_fields = ['username', 'email', 'password', 'roles']
    data = request.get_json()
    if not data:
        return response_with_error("Request must be JSON", 400)
    
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return response_with_error(f"Missing fields: {', '.join(missing_fields)}", 400)
    
    return None

def validate_login_data():
    required_fields = ['email', 'password']
    data = request.get_json()
    if not data:
        return response_with_error("Request must be JSON", 400)
    
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return response_with_error(f"Missing fields: {', '.join(missing_fields)}", 400)
    
    return None

def validate_leave_request_data():
    required_fields = ['employee_id', 'start_date', 'end_date', 'leave_type']
    data = request.get_json()
    if not data:
        return response_with_error("Request must be JSON", 400)
    
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return response_with_error(f"Missing fields: {', '.join(missing_fields)}", 400)
    
    return None

def response_with_error(message, status_code):
    response = jsonify({
        "error": message
    })
    response.status_code = status_code
    return response
