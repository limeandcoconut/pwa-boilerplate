<template>
    <div>
        Four Oh Four
    </div>
</template>

<script>
export default {
    // This component must be named "fourohfour" for serverside 404 statuscodes to work correctly
    // The server detects when a 404 happens by checking when this component is loaded but the route is not /404
    name: 'fourohfour',
    meta() {
        return {
            title: 'Error 404 - Page not found',
        }
    },
}
</script>
