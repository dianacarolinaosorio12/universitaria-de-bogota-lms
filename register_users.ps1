$headers = @{ "Content-Type" = "application/json" }
$baseUrl = "http://localhost:5001/api/v1/auth/register"

# Register Student
$studentBody = @{
    email = "estudiante@universitariadebogota.edu.co"
    password = "Student2026!"
    firstName = "Carlos"
    lastName = "Rodriguez"
    role = "Student"
    department = "Ingenieria"
    faculty = "Ingenieria en IA"
} | ConvertTo-Json

Write-Host "=== Registering Student ===" -ForegroundColor Cyan
try {
    $result = Invoke-RestMethod -Uri $baseUrl -Method POST -Body $studentBody -ContentType "application/json"
    Write-Host "SUCCESS: Student registered" -ForegroundColor Green
    Write-Host "User: $($result.user.email) | Role: $($result.user.role)"
    Write-Host "Token: $($result.accessToken.Substring(0, 50))..."
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
        Write-Host $reader.ReadToEnd()
        $reader.Close()
    }
}

Write-Host ""

# Register Teacher
$teacherBody = @{
    email = "docente@universitariadebogota.edu.co"
    password = "Teacher2026!"
    firstName = "Maria"
    lastName = "Lopez"
    role = "Teacher"
    department = "Ciencias de la Computacion"
    faculty = "Ingenieria en IA"
} | ConvertTo-Json

Write-Host "=== Registering Teacher ===" -ForegroundColor Cyan
try {
    $result = Invoke-RestMethod -Uri $baseUrl -Method POST -Body $teacherBody -ContentType "application/json"
    Write-Host "SUCCESS: Teacher registered" -ForegroundColor Green
    Write-Host "User: $($result.user.email) | Role: $($result.user.role)"
    Write-Host "Token: $($result.accessToken.Substring(0, 50))..."
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
        Write-Host $reader.ReadToEnd()
        $reader.Close()
    }
}

Write-Host ""

# Register Admin
$adminBody = @{
    email = "admin@universitariadebogota.edu.co"
    password = "Admin2026!!"
    firstName = "Juan"
    lastName = "Martinez"
    role = "Admin"
    department = "Administracion"
    faculty = "Rectoría"
} | ConvertTo-Json

Write-Host "=== Registering Admin ===" -ForegroundColor Cyan
try {
    $result = Invoke-RestMethod -Uri $baseUrl -Method POST -Body $adminBody -ContentType "application/json"
    Write-Host "SUCCESS: Admin registered" -ForegroundColor Green
    Write-Host "User: $($result.user.email) | Role: $($result.user.role)"
    Write-Host "Token: $($result.accessToken.Substring(0, 50))..."
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
        Write-Host $reader.ReadToEnd()
        $reader.Close()
    }
}

Write-Host ""
Write-Host "=== All users registered ===" -ForegroundColor Green
Write-Host "Student: estudiante@universitariadebogota.edu.co / Student2026!"
Write-Host "Teacher: docente@universitariadebogota.edu.co / Teacher2026!"
Write-Host "Admin:   admin@universitariadebogota.edu.co / Admin2026!!"
