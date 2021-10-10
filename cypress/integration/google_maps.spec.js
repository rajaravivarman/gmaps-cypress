describe('Navigate to Google Maps', () => {
    it('Go to the link in Google Maps', () => {

        cy.visit('https://www.google.com/maps/place/Gardens+by+the+Bay/@1.2815683,103.8614245,17z/data=!3m1!4b1!4m5!3m4!1s0x31da1904937e1633:0x62099677b59fca76!8m2!3d1.2815683!4d103.8636132')

        cy.contains("Collapse side panel")
            .parent()
            .should('be.visible')
            .click()

    })
})

describe('Click & Drag', () => {
    it('Click and drag to pan the map in canvas', () => {

        cy.get('.widget-scene-canvas')
            .trigger('mousedown', { button: 0 })
            .wait(2000)
            .trigger('mousemove', 'top')
            .wait(2000)
            .trigger('mouseup')
            .dblclick(750, 150)

    })
})


describe('Click on Marina Bay Sands Singapore', () => {
    it('Mouse click Marina Bay Sands Singapore from the map to select it', () => {

        cy.get('.widget-scene-canvas')
            .then($canvas => {

                const canvasWidth = $canvas.width()
                const canvasHeight = $canvas.height()
                const canvasCenterX = canvasWidth / 2;
                const canvasCenterY = canvasHeight / 2;
                const pointX = canvasCenterX + canvasCenterX / 3
                const pointY = canvasCenterY - canvasCenterY / 3

                cy.wrap($canvas)
                    .scrollIntoView()
                    .click(pointX, pointY)
                    .wait(2000)

                cy.get(`[aria-label="Marina Bay Sands Singapore"]`)
                    .should('contain.text', 'Marina Bay Sands Singapore')
                    .wait(1000)

                cy.contains("Collapse side panel")
                    .parent()
                    .should('be.visible')
                    .click()

            })
    })
})


describe('Check the Map', () => {
    it('The rivers, parks, and beaches are correctly drawn on the canvas', () => {

        cy.wait(1000)
        cy.matchImageSnapshot("Baseline");

    })
})