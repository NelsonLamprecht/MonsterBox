function mb_start() {
    $postParams = @{START=0}
    $response = $null
    $response = Invoke-WebRequest http://192.168.1.50/monsterbox -Method Post -Body $postParams -TimeoutSec 10
    Write-Output "StatusCode: $($response.StatusCode)"
    foreach ($key in $response.Headers) {
        Write-Output $key $($response[$key])
    }
    Write-Output "Content: $($response.Content)"
}

function mb_stop() {
    $postParams = @{STOP=0}
    $response = $null
    $response = Invoke-WebRequest http://192.168.1.50/monsterbox -Method Post -Body $postParams -TimeoutSec 10
    Write-Output "StatusCode: $($response.StatusCode)"
    foreach ($key in $response.Headers) {
        Write-Output $key $($response[$key])
    }
    Write-Output "Content: $($response.Content)"
}

function mb_setdelaytimelow() {
    $postParams = @{SETDELAYTIMELOW=50}
    $response = $null
    $response = Invoke-WebRequest http://192.168.1.50/monsterbox -Method Post -Body $postParams -TimeoutSec 10
    Write-Output "StatusCode: $($response.StatusCode)"
    foreach ($key in $response.Headers) {
        Write-Output $key $($response[$key])
    }
    Write-Output "Content: $($response.Content)"
}

function mb_setdelaytimehigh() {
    $postParams = @{SETDELAYTIMEHIGH=500}
    $response = $null
    $response = Invoke-WebRequest http://192.168.1.50/monsterbox -Method Post -Body $postParams -TimeoutSec 10
    Write-Output "StatusCode: $($response.StatusCode)"
    foreach ($key in $response.Headers) {
        Write-Output $key $($response[$key])
    }
    Write-Output "Content: $($response.Content)"
}


function mb_setrepetitionslow() {
    $postParams = @{SETREPETITIONSLOW=3}
    $response = $null
    $response = Invoke-WebRequest http://192.168.1.50/monsterbox -Method Post -Body $postParams -TimeoutSec 10
    Write-Output "StatusCode: $($response.StatusCode)"
    foreach ($key in $response.Headers) {
        Write-Output $key $($response[$key])
    }
    Write-Output "Content: $($response.Content)"
}


function mb_setrepetitionshigh() {
    $postParams = @{SETREPETITIONSHIGH=5}
    $response = $null
    $response = Invoke-WebRequest http://192.168.1.50/monsterbox -Method Post -Body $postParams -TimeoutSec 10
    Write-Output "StatusCode: $($response.StatusCode)"
    foreach ($key in $response.Headers) {
        Write-Output $key $($response[$key])
    }
    Write-Output "Content: $($response.Content)"
}

cls
mb_stop
mb_setdelaytimelow
mb_setdelaytimehigh
mb_setrepetitionslow
mb_setrepetitionshigh
mb_start