'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { mockDeals } from '@/data/mockDeals';
import { Deal } from '@/types';

export default function DealDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  useEffect(() => {
    const foundDeal = mockDeals.find(d => d.id === params.id);
    if (foundDeal) {
      setDeal(foundDeal);
      
      // Check watchlist
      const saved = localStorage.getItem('watchlist');
      if (saved) {
        const watchlist = JSON.parse(saved);
        setIsWatchlisted(watchlist.includes(foundDeal.id));
      }
    }
  }, [params.id]);

  const toggleWatchlist = () => {
    if (!deal) return;
    
    const saved = localStorage.getItem('watchlist');
    let watchlist = saved ? JSON.parse(saved) : [];
    
    if (isWatchlisted) {
      watchlist = watchlist.filter((id: string) => id !== deal.id);
    } else {
      watchlist.push(deal.id);
    }
    
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    setIsWatchlisted(!isWatchlisted);
  };

  if (!deal) {
    return (
      <div className="min-h-screen bg-graphite-950">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-white text-xl">Deal not found</p>
        </main>
      </div>
    );
  }

  const getRiskColor = (score: number) => {
    if (score < 40) return 'text-precision-green-400';
    if (score < 65) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getClimateColor = (level: string) => {
    if (level === 'low') return 'badge-low';
    if (level === 'medium') return 'badge-medium';
    return 'badge-high';
  };

  return (
    <div className="min-h-screen bg-graphite-950">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => router.back()}
          className="text-precision-green-400 hover:text-precision-green-300 mb-6 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>

        <div className="card mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{deal.projectName}</h1>
              <p className="text-xl text-graphite-400">{deal.country} • {deal.region}</p>
            </div>
            <button
              onClick={toggleWatchlist}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                isWatchlisted 
                  ? 'bg-precision-green-700 text-white hover:bg-precision-green-600' 
                  : 'bg-graphite-800 text-graphite-300 hover:bg-graphite-700'
              }`}
            >
              {isWatchlisted ? '✓ In Watchlist' : '+ Add to Watchlist'}
            </button>
          </div>

          <p className="text-graphite-300 text-lg leading-relaxed mb-8">
            {deal.description}
          </p>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-graphite-800 rounded-lg p-4">
              <p className="text-graphite-500 text-sm mb-1">Crop Type</p>
              <p className="text-white text-2xl font-bold capitalize">{deal.crop}</p>
            </div>
            <div className="bg-graphite-800 rounded-lg p-4">
              <p className="text-graphite-500 text-sm mb-1">Ticket Size</p>
              <p className="text-white text-2xl font-bold">€{(deal.ticketSize / 1000).toFixed(0)}K</p>
            </div>
            <div className="bg-graphite-800 rounded-lg p-4">
              <p className="text-graphite-500 text-sm mb-1">Hectares</p>
              <p className="text-white text-2xl font-bold">{deal.hectares}</p>
            </div>
            <div className="bg-graphite-800 rounded-lg p-4">
              <p className="text-graphite-500 text-sm mb-1">Term</p>
              <p className="text-white text-2xl font-bold">{deal.investmentTerm}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="card">
            <h2 className="text-2xl font-bold text-white mb-6">Risk Assessment</h2>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <p className="text-graphite-400">Overall Risk Score</p>
                <span className={`text-3xl font-bold ${getRiskColor(deal.riskScore)}`}>
                  {deal.riskScore}/100
                </span>
              </div>
              <div className="bg-graphite-800 rounded-full h-4">
                <div 
                  className={`h-4 rounded-full`}
                  style={{ 
                    width: `${deal.riskScore}%`,
                    background: deal.riskScore < 40 
                      ? 'linear-gradient(90deg, #22c55e, #16a34a)' 
                      : deal.riskScore < 65 
                        ? 'linear-gradient(90deg, #facc15, #eab308)'
                        : 'linear-gradient(90deg, #f87171, #dc2626)'
                  }}
                />
              </div>
              <p className="text-graphite-500 text-sm mt-2">
                Risk Level: <span className={`font-semibold ${getRiskColor(deal.riskScore)}`}>
                  {deal.riskLevel.toUpperCase()}
                </span>
              </p>
            </div>

            <div className="bg-graphite-800 rounded-lg p-4">
              <p className="text-graphite-400 text-sm mb-3">💡 Science-Based Risk Engine</p>
              <p className="text-graphite-500 text-xs">
                Our proprietary algorithm analyzes climate data, soil quality, historical yield patterns, 
                market volatility, and geopolitical factors to generate comprehensive risk scores.
              </p>
            </div>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold text-white mb-6">Climate Exposure</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🌡️</span>
                  <span className="text-graphite-300">Heat Stress</span>
                </div>
                <span className={`badge ${getClimateColor(deal.climateExposure.heat)}`}>
                  {deal.climateExposure.heat.toUpperCase()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">💧</span>
                  <span className="text-graphite-300">Drought Risk</span>
                </div>
                <span className={`badge ${getClimateColor(deal.climateExposure.drought)}`}>
                  {deal.climateExposure.drought.toUpperCase()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🌱</span>
                  <span className="text-graphite-300">Soil Degradation</span>
                </div>
                <span className={`badge ${getClimateColor(deal.climateExposure.soilDegradation)}`}>
                  {deal.climateExposure.soilDegradation.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="mt-6 bg-graphite-800 rounded-lg p-4">
              <p className="text-graphite-500 text-xs">
                Climate exposure metrics are derived from satellite data, weather patterns, 
                and predictive climate models specific to the project location.
              </p>
            </div>
          </div>
        </div>

        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Financial Projections</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Expected Revenue (EUR)</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-graphite-400">Pessimistic</span>
                  <span className="text-red-400 font-bold text-xl">
                    €{(deal.revenueExpectation.pessimistic / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-graphite-400">Base Case</span>
                  <span className="text-white font-bold text-xl">
                    €{(deal.revenueExpectation.base / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-graphite-400">Optimistic</span>
                  <span className="text-precision-green-400 font-bold text-xl">
                    €{(deal.revenueExpectation.optimistic / 1000).toFixed(0)}K
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Expected ROI (%)</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-graphite-400">Minimum</span>
                  <span className="text-red-400 font-bold text-xl">{deal.expectedROI.min}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-graphite-400">Base Case</span>
                  <span className="text-white font-bold text-xl">{deal.expectedROI.base}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-graphite-400">Maximum</span>
                  <span className="text-precision-green-400 font-bold text-xl">{deal.expectedROI.max}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-red-900/20 via-yellow-900/20 to-precision-green-900/20 rounded-lg p-4 border border-graphite-700">
            <p className="text-graphite-400 text-sm">
              📊 Projections are based on historical yield data, market analysis, and climate modeling. 
              Actual returns may vary based on weather conditions, market prices, and operational execution.
            </p>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold text-white mb-6">ESG & Climate Co-Benefits</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deal.esgBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center bg-graphite-800 rounded-lg p-4">
                <span className="text-2xl mr-3">✓</span>
                <span className="text-graphite-300">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-precision-green-900/20 border border-precision-green-700 rounded-lg p-4">
            <p className="text-precision-green-400 text-sm">
              🌍 This project contributes to sustainable agriculture practices and supports local communities 
              while generating positive environmental impact.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
