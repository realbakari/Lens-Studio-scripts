// @input Component.ObjectTracking objectTracker
// @input SceneObject objectToPlace

var placementPad;

script.api.onSurfaceFound = function() {
    print("Surface found!");
    placementPad = script.objectTracker.createPlacementPad();
    placementPad.addMoveListener(onPadMove);
};

script.api.onSurfaceLost = function() {
    print("Surface lost");
    if (placementPad) {
        placementPad.destroy();
        placementPad = null;
    }
};

function onPadMove(padTransform) {
    if (script.objectToPlace) {
        script.objectToPlace.getTransform().setWorldTransform(padTransform);
    }
}

var touchSystem = global.scene.getTouchSystem();
touchSystem.touchBlocking = true;
touchSystem.addTouchBlockingException("TouchTypeJoystick");
touchSystem.enableTouchBlockingException("TouchTypeJoystick");

var tapEvent = script.createEvent("TapEvent");
tapEvent.bind(function() {
    if (placementPad) {
        script.objectToPlace.enabled = true;
    }
});

// This script does the following:

// It uses Lens Studio's ObjectTracking component to detect surfaces.
// When a surface is found, it creates a placement pad (an invisible marker for where objects can be placed).
// The script updates the position of the objectToPlace (which should be set in the Inspector) to match the placement pad's position.
// When the user taps the screen, if a surface has been detected, it enables the objectToPlace, making it visible in the scene.

// To use this script:

// Attach it to an empty SceneObject in your Lens Studio project.
// In the Inspector, assign an ObjectTracking component to the objectTracker input.
// Assign the 3D object you want to place to the objectToPlace input.
// Make sure your 3D object is initially disabled in the scene.
