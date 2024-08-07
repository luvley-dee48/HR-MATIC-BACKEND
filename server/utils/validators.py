from flask import request, jsonify

# utils/validators.py

def validate_registration_data(data):
    # Add your validation logic here
    errors = []
    if 'email' not in data or not data['email']:
        errors.append("Email is required.")
    if 'password' not in data or not data['password']:
        errors.append("Password is required.")
    if errors:
        return {"msg": errors}, 400
    return None

def validate_login_data():
    data = request.get_json()
    errors = []

    if not data:
        errors.append("Request data is required.")
    
    if 'email' not in data or not data['email']:
        errors.append("Email is required.")
    if 'password' not in data or not data['password']:
        errors.append("Password is required.")

    if errors:
        return {"msg": errors}, 400
    return None

def validate_leave_request_data():
    data = request.get_json()
    errors = []

    if not data:
        errors.append("Request data is required.")
    
    if 'employee_id' not in data or not data['employee_id']:
        errors.append("Employee ID is required.")
    if 'leave_type' not in data or not data['leave_type']:
        errors.append("Leave type is required.")
    if 'start_date' not in data or not data['start_date']:
        errors.append("Start date is required.")
    if 'end_date' not in data or not data['end_date']:
        errors.append("End date is required.")

    if errors:
        return {"msg": errors}, 400
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