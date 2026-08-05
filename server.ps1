$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8000/")
$listener.Start()
Write-Host "Server running on http://localhost:8000/"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $path = $request.Url.LocalPath
    if ($path -eq "/") { $path = "/index.html" }
    
    $localFilePath = Join-Path "c:\avinya spark" $path.TrimStart('/')
    
    if (Test-Path $localFilePath -PathType Leaf) {
        $bytes = [System.IO.File]::ReadAllBytes($localFilePath)
        if ($localFilePath.EndsWith(".html")) { $response.ContentType = "text/html" }
        elseif ($localFilePath.EndsWith(".css")) { $response.ContentType = "text/css" }
        elseif ($localFilePath.EndsWith(".js")) { $response.ContentType = "application/javascript" }
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $response.StatusCode = 404
    }
    $response.OutputStream.Close()
}
