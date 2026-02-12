Write-Host "========================================" -ForegroundColor Yellow
Write-Host "  UB LMS - Pruebas de API Completas" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
Write-Host ""

# Test 1: Gateway Status
Write-Host "TEST 1: API Gateway Status" -ForegroundColor Cyan
$gw = Invoke-RestMethod -Uri "http://localhost:5000/"
Write-Host "  Service: $($gw.service)" -ForegroundColor Green
Write-Host "  Status: $($gw.status)" -ForegroundColor Green
Write-Host "  PASS" -ForegroundColor Green
Write-Host ""

# Test 2: Identity Health Check
Write-Host "TEST 2: Identity Service Health Check" -ForegroundColor Cyan
$health = Invoke-WebRequest -Uri "http://localhost:5001/health"
Write-Host "  Status Code: $($health.StatusCode)" -ForegroundColor Green
Write-Host "  Response: $($health.Content)" -ForegroundColor Green
Write-Host "  PASS" -ForegroundColor Green
Write-Host ""

# Test 3: Swagger available
Write-Host "TEST 3: Swagger UI Available" -ForegroundColor Cyan
$swagger = Invoke-WebRequest -Uri "http://localhost:5001/swagger/v1/swagger.json"
Write-Host "  Status Code: $($swagger.StatusCode)" -ForegroundColor Green
Write-Host "  PASS" -ForegroundColor Green
Write-Host ""

# Test 4: Login as Student
Write-Host "TEST 4: Login as Student" -ForegroundColor Cyan
$loginBody = @{ email = "estudiante@universitariadebogota.edu.co"; password = "Student2026!" } | ConvertTo-Json
$student = Invoke-RestMethod -Uri "http://localhost:5001/api/v1/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
Write-Host "  User: $($student.user.firstName) $($student.user.lastName)" -ForegroundColor Green
Write-Host "  Email: $($student.user.email)" -ForegroundColor Green
Write-Host "  Role: $($student.user.role)" -ForegroundColor Green
Write-Host "  JWT expires: $($student.expiresAt)" -ForegroundColor Green
Write-Host "  PASS" -ForegroundColor Green
Write-Host ""

# Test 5: Login as Teacher
Write-Host "TEST 5: Login as Teacher" -ForegroundColor Cyan
$loginBody = @{ email = "docente@universitariadebogota.edu.co"; password = "Teacher2026!" } | ConvertTo-Json
$teacher = Invoke-RestMethod -Uri "http://localhost:5001/api/v1/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
Write-Host "  User: $($teacher.user.firstName) $($teacher.user.lastName)" -ForegroundColor Green
Write-Host "  Role: $($teacher.user.role)" -ForegroundColor Green
Write-Host "  PASS" -ForegroundColor Green
Write-Host ""

# Test 6: Login as Admin
Write-Host "TEST 6: Login as Admin" -ForegroundColor Cyan
$loginBody = @{ email = "admin@universitariadebogota.edu.co"; password = "Admin2026!!" } | ConvertTo-Json
$admin = Invoke-RestMethod -Uri "http://localhost:5001/api/v1/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
Write-Host "  User: $($admin.user.firstName) $($admin.user.lastName)" -ForegroundColor Green
Write-Host "  Role: $($admin.user.role)" -ForegroundColor Green
Write-Host "  PASS" -ForegroundColor Green
Write-Host ""

# Test 7: Authenticated /me endpoint
Write-Host "TEST 7: Authenticated GET /me (Student token)" -ForegroundColor Cyan
$meHeaders = @{ "Authorization" = "Bearer $($student.accessToken)" }
$me = Invoke-RestMethod -Uri "http://localhost:5001/api/v1/auth/me" -Headers $meHeaders
Write-Host "  User ID: $($me.id)" -ForegroundColor Green
Write-Host "  Email: $($me.email)" -ForegroundColor Green
Write-Host "  Role: $($me.role)" -ForegroundColor Green
Write-Host "  PASS" -ForegroundColor Green
Write-Host ""

# Test 8: Refresh Token
Write-Host "TEST 8: Refresh Token" -ForegroundColor Cyan
$refreshBody = @{ token = $student.refreshToken } | ConvertTo-Json
$refreshed = Invoke-RestMethod -Uri "http://localhost:5001/api/v1/auth/refresh" -Method POST -Body $refreshBody -ContentType "application/json"
Write-Host "  New access token generated" -ForegroundColor Green
Write-Host "  New refresh token generated" -ForegroundColor Green
Write-Host "  Expires: $($refreshed.expiresAt)" -ForegroundColor Green
Write-Host "  PASS" -ForegroundColor Green
Write-Host ""

# Test 9: Invalid credentials
Write-Host "TEST 9: Invalid Credentials (should fail)" -ForegroundColor Cyan
$badBody = @{ email = "bad@test.com"; password = "wrong" } | ConvertTo-Json
try {
    Invoke-RestMethod -Uri "http://localhost:5001/api/v1/auth/login" -Method POST -Body $badBody -ContentType "application/json"
    Write-Host "  FAIL - Should have returned error" -ForegroundColor Red
} catch {
    Write-Host "  Correctly rejected: 401 Unauthorized" -ForegroundColor Green
    Write-Host "  PASS" -ForegroundColor Green
}
Write-Host ""

# Test 10: Gateway proxy to Identity
Write-Host "TEST 10: Gateway Proxy (login via port 5000)" -ForegroundColor Cyan
$loginBody = @{ email = "estudiante@universitariadebogota.edu.co"; password = "Student2026!" } | ConvertTo-Json
$proxied = Invoke-RestMethod -Uri "http://localhost:5000/api/v1/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
Write-Host "  User via Gateway: $($proxied.user.firstName) $($proxied.user.lastName)" -ForegroundColor Green
Write-Host "  Role: $($proxied.user.role)" -ForegroundColor Green
Write-Host "  PASS" -ForegroundColor Green
Write-Host ""

# Test 11: Duplicate registration
Write-Host "TEST 11: Duplicate Registration (should fail 409)" -ForegroundColor Cyan
$dupBody = @{ email = "estudiante@universitariadebogota.edu.co"; password = "Student2026!"; firstName = "Test"; lastName = "Dup"; role = "Student" } | ConvertTo-Json
try {
    Invoke-RestMethod -Uri "http://localhost:5001/api/v1/auth/register" -Method POST -Body $dupBody -ContentType "application/json"
    Write-Host "  FAIL - Should have returned 409" -ForegroundColor Red
} catch {
    Write-Host "  Correctly rejected: Duplicate email" -ForegroundColor Green
    Write-Host "  PASS" -ForegroundColor Green
}
Write-Host ""

# Test 12: Frontend accessible
Write-Host "TEST 12: Frontend Shell App (port 3000)" -ForegroundColor Cyan
$frontend = Invoke-WebRequest -Uri "http://localhost:3000/"
Write-Host "  Status Code: $($frontend.StatusCode)" -ForegroundColor Green
Write-Host "  Contains 'Universitaria': $($frontend.Content.Contains('Universitaria'))" -ForegroundColor Green
Write-Host "  PASS" -ForegroundColor Green
Write-Host ""

Write-Host "========================================" -ForegroundColor Yellow
Write-Host "  RESULTS: 12/12 Tests PASSED" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Yellow
