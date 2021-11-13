
export var keys_down = [];

export function keys_down_string()
{
    return keys_down.join(" ");
}

// returns if key is down
export function isKeyDown(key)
{
    return keys_down.indexOf(key) > -1;
}

// returns true if ANY of the keys in the array are down
export function areKeysDown(keysArr)
{
    for(let key of keysArr)
    {
        if(isKeyDown(key))
        {
            return true;
        }
    }
    return false;
}

function keyDownListener(event)
{
    let key = event.key.toLowerCase().trim();
    if(!key)
    {
        return;
    }

    if(keys_down.indexOf(key) < 0)
    {
        keys_down.push(key);
    }
}

function keyUpListener(event)
{
    let key = event.key.toLowerCase().trim();
    if(!key)
    {
        return;
    }

    let index = keys_down.indexOf(key);

    if(index > -1)
    {
        keys_down.splice(index, 1);
    }
}

function focusOutListener()
{
    keys_down = [];
}

function contextMenuListener(event)
{
    event.preventDefault();
}

document.addEventListener("keydown", keyDownListener);
document.addEventListener("keyup", keyUpListener);
document.addEventListener("blur", focusOutListener);
document.addEventListener("focus", focusOutListener);
document.addEventListener("contextmenu", contextMenuListener);
