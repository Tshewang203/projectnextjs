'use client'

import { useState } from 'react'

export default function CostCalculator() {
  const [costBreakdown, setCostBreakdown] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState('')

  const validateInputs = (days, travelers) => {
    if (days < 1) {
      return 'Duration must be at least 1 day'
    }
    if (days > 30) {
      return 'Maximum duration is 30 days'
    }
    if (travelers < 1) {
      return 'Number of travelers must be at least 1'
    }
    if (travelers > 20) {
      return 'Maximum group size is 20 travelers'
    }
    return ''
  }

  const calculateCost = async (e) => {
    e.preventDefault()
    setError('')
    const formData = new FormData(e.currentTarget)
    
    const days = parseInt(formData.get('tripDays'))
    const travelers = parseInt(formData.get('travelers'))
    
    // Validate inputs
    const validationError = validateInputs(days, travelers)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsCalculating(true)
    try {
      const season = formData.get('season')
      const accommodation = formData.get('accommodationType')
      const privateGuide = formData.get('guideService') === 'on'
      const privateTransport = formData.get('transportation') === 'on'
      const activities = formData.get('activities') === 'on'

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Base rates
      const baseRate = season === 'peak' ? 250 : 200
      let accommodationRate

      switch(accommodation) {
        case '3star': accommodationRate = 100; break
        case '4star': accommodationRate = 150; break
        case '5star': accommodationRate = 250; break
        case 'luxury': accommodationRate = 400; break
        default: accommodationRate = 100
      }

      // Calculate costs
      const baseCost = baseRate * days * travelers
      const accommodationCost = accommodationRate * days * travelers
      const guideCost = privateGuide ? 50 * days : 0
      const transportCost = privateTransport ? 80 * days : 0
      const activitiesCost = activities ? 40 * days * travelers : 0

      const totalCost = baseCost + accommodationCost + guideCost + transportCost + activitiesCost

      setCostBreakdown({
        baseCost,
        accommodationCost,
        guideCost,
        transportCost,
        activitiesCost,
        totalCost
      })
    } catch (error) {
      setError('An error occurred while calculating the cost. Please try again.')
    } finally {
      setIsCalculating(false)
    }
  }

  return (
    <section className="calculator-section py-16 bg-[var(--rice-white)]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 font-['Cinzel'] text-[#2B3F55]">
          Estimate Your Trip Cost
        </h2>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={calculateCost} className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 font-['Playfair_Display']">Duration (Days)</label>
                <input
                  type="number"
                  name="tripDays"
                  min="1"
                  max="30"
                  defaultValue="5"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2B3F55]"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">1-30 days</p>
              </div>
              <div>
                <label className="block mb-2 font-['Playfair_Display']">Number of Travelers</label>
                <input
                  type="number"
                  name="travelers"
                  min="1"
                  max="20"
                  defaultValue="2"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2B3F55]"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">1-20 travelers</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 font-['Playfair_Display']">Season</label>
                <select
                  name="season"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2B3F55]"
                  required
                >
                  <option value="peak">Peak Season (Mar-May, Sep-Nov)</option>
                  <option value="offpeak">Off-Peak Season (Dec-Feb, Jun-Aug)</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-['Playfair_Display']">Accommodation Type</label>
                <select
                  name="accommodationType"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2B3F55]"
                  required
                >
                  <option value="3star">3-Star Hotel ($100/night)</option>
                  <option value="4star">4-Star Hotel ($150/night)</option>
                  <option value="5star">5-Star Hotel ($250/night)</option>
                  <option value="luxury">Luxury Resort ($400/night)</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-['Playfair_Display']">Additional Services</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="guideService"
                    id="guideService"
                    className="mr-2"
                  />
                  <label htmlFor="guideService">Private Guide (+$50/day)</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="transportation"
                    id="transportation"
                    className="mr-2"
                  />
                  <label htmlFor="transportation">Private Transportation (+$80/day)</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="activities"
                    id="activities"
                    className="mr-2"
                  />
                  <label htmlFor="activities">Cultural Activities & Tours (+$40/day/person)</label>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isCalculating}
              className={`w-full py-3 bg-[#2B3F55] text-white rounded-lg transition-colors font-['Cinzel'] ${
                isCalculating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1a2633]'
              }`}
            >
              {isCalculating ? 'Calculating...' : 'Calculate Cost'}
            </button>
          </form>

          {costBreakdown && (
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4 font-['Cinzel'] text-[#2B3F55]">
                Estimated Trip Cost
              </h3>
              <div className="space-y-2 font-['Playfair_Display']">
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Base Package Cost:</span>
                  <span className="font-bold">${costBreakdown.baseCost}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Accommodation:</span>
                  <span className="font-bold">${costBreakdown.accommodationCost}</span>
                </div>
                {costBreakdown.guideCost > 0 && (
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Private Guide:</span>
                    <span className="font-bold">${costBreakdown.guideCost}</span>
                  </div>
                )}
                {costBreakdown.transportCost > 0 && (
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Private Transportation:</span>
                    <span className="font-bold">${costBreakdown.transportCost}</span>
                  </div>
                )}
                {costBreakdown.activitiesCost > 0 && (
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Activities & Tours:</span>
                    <span className="font-bold">${costBreakdown.activitiesCost}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-4 mt-2 border-t-2 border-[#2B3F55]">
                  <span className="text-xl font-bold text-[#2B3F55]">Total Estimated Cost:</span>
                  <span className="text-xl font-bold text-[#2B3F55]">
                    ${costBreakdown.totalCost}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  *Prices are estimates and may vary based on availability and season. The final cost will be confirmed upon booking.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
} 