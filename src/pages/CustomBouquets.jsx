export default function CustomBouquets() {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Custom Bouquets</h1>
      <div className="max-w-2xl mx-auto">
        <form className="card p-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="occasion">
              Occasion
            </label>
            <select
              id="occasion"
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select an occasion</option>
              <option value="birthday">Birthday</option>
              <option value="wedding">Wedding</option>
              <option value="anniversary">Anniversary</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="budget">
              Budget (KES)
            </label>
            <input
              type="number"
              id="budget"
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter your budget"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="preferences">
              Special Preferences
            </label>
            <textarea
              id="preferences"
              className="w-full border rounded-lg px-3 py-2"
              rows="4"
              placeholder="Tell us about your preferences (colors, flowers, style, etc.)"
            ></textarea>
          </div>

          <button type="submit" className="btn-primary w-full">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  )
}