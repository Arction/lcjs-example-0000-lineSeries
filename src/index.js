/*
 * LightningChartJS example that showcases a simple XY line series.
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Extract required parts from LightningChartJS.
const {
    lightningChart,
    SolidLine,
    SolidFill,
    ColorRGBA,
    AxisTickStrategies,
    UIOrigins,
    DataPatterns,
    Themes
} = lcjs

// Decide on an origin for DateTime axis.
const dateOrigin = new Date(2018, 8, 1)

// ----- Cache used styles -----
const customStrokeStyle = new SolidLine({ fillStyle: new SolidFill({ color: ColorRGBA(200, 50, 50) }), thickness: 2 })

// Create a XY Chart.
const chart = lightningChart().ChartXY({
    // theme: Themes.dark
})
// Modify the default X Axis to use DateTime TickStrategy, and set the origin for the DateTime Axis.
chart.getDefaultAxisX().setTickStrategy(AxisTickStrategies.DateTime, (tickStrategy) => tickStrategy.setDateOrigin(dateOrigin))

chart.setPadding({
    right: 50
})
    .setTitle('Diesel and Gasoline Price Comparison')

const diesel = [
    { x: 0, y: 1.52 },
    { x: 1, y: 1.52 },
    { x: 2, y: 1.52 },
    { x: 3, y: 1.58 },
    { x: 4, y: 2.00 },
    { x: 5, y: 2.00 },
    { x: 6, y: 2.00 },
    { x: 7, y: 2.00 },
    { x: 8, y: 2.26 },
    { x: 9, y: 1.90 },
    { x: 10, y: 1.90 },
    { x: 11, y: 1.90 },
    { x: 12, y: 1.90 },
    { x: 13, y: 1.60 },
    { x: 14, y: 1.60 },
    { x: 15, y: 1.60 },
    { x: 16, y: 1.00 },
    { x: 17, y: 1.00 },
    { x: 18, y: 1.00 },
    { x: 19, y: 1.74 },
    { x: 20, y: 1.47 },
    { x: 21, y: 1.47 },
    { x: 22, y: 1.47 },
    { x: 23, y: 1.74 },
    { x: 24, y: 1.74 },
    { x: 25, y: 1.74 },
    { x: 27, y: 1.5 },
    { x: 28, y: 1.5 },
    { x: 29, y: 1.5 }
]

const gasoline = [
    { x: 0, y: 1.35 },
    { x: 1, y: 1.35 },
    { x: 2, y: 1.35 },
    { x: 3, y: 1.35 },
    { x: 4, y: 1.90 },
    { x: 5, y: 1.90 },
    { x: 6, y: 1.90 },
    { x: 7, y: 1.92 },
    { x: 8, y: 1.50 },
    { x: 9, y: 1.50 },
    { x: 10, y: 1.3 },
    { x: 11, y: 1.3 },
    { x: 12, y: 1.3 },
    { x: 13, y: 1.3 },
    { x: 14, y: 1.3 },
    { x: 15, y: 1.32 },
    { x: 16, y: 1.40 },
    { x: 17, y: 1.44 },
    { x: 18, y: 1.02 },
    { x: 19, y: 1.02 },
    { x: 20, y: 1.02 },
    { x: 21, y: 1.02 },
    { x: 22, y: 1.02 },
    { x: 23, y: 1.02 },
    { x: 24, y: 1.02 },
    { x: 25, y: 1.02 },
    { x: 27, y: 1.30 },
    { x: 28, y: 1.30 },
    { x: 29, y: 1.30 }
]

// Add two line series.
const lineSeries = chart.addLineSeries()
    .setName('Diesel')

const lineSeries2 = chart.addLineSeries()
    .setName('Gasoline')
    .setStrokeStyle(customStrokeStyle)

// Set the correct value to use for the data frequency.
// 1000ms * 60s * 60min * 24h
const dataFrequency = 1000 * 60 * 60 * 24

// Add the points to each Series - the X values are multiplied by dataFrequency to set the values properly on the X Axis.
lineSeries2.add(diesel.map((point) => ({ x: point.x * dataFrequency, y: point.y })))
lineSeries.add(gasoline.map((point) => ({ x: point.x * dataFrequency, y: point.y })))

// Setup view nicely.
chart.getDefaultAxisY()
    .setTitle('$/litre')
    .setInterval(0, 3, false, true)

// Enable AutoCursor auto-fill.
chart.setAutoCursor(cursor => cursor
    .setResultTableAutoTextStyle(true)
    .disposeTickMarkerX()
    .setTickMarkerYAutoTextStyle(true)
)
const legend = chart.addLegendBox()

// Add Chart to LegendBox.
legend.add(chart)
