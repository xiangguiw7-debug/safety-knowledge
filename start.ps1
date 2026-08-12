$port = 8000
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "正在启动本地服务器：http://127.0.0.1:$port"
Write-Host "按 Ctrl+C 停止。"

Push-Location $root
try {
  python -m http.server $port --bind 127.0.0.1
} finally {
  Pop-Location
}
