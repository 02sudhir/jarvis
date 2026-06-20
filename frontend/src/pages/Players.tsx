import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api.service';

const Players: React.FC = () => {
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPlayers();
  }, [page]);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const response = await apiService.getPlayers(page, 20);
      setPlayers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching players:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Players</h1>

      {/* Search & Filter */}
      <div className="mb-8 flex gap-4">
        <input
          type="text"
          placeholder="Search players..."
          className="flex-1 border rounded-lg px-4 py-2"
        />
        <select className="border rounded-lg px-4 py-2">
          <option>All Countries</option>
          <option>India</option>
          <option>Pakistan</option>
          <option>Australia</option>
        </select>
        <select className="border rounded-lg px-4 py-2">
          <option>All Roles</option>
          <option>Batsman</option>
          <option>Bowler</option>
          <option>All-rounder</option>
        </select>
      </div>

      {/* Players Grid */}
      <div>
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading players...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {players.map((player: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-24"></div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg">{player.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{player.country}</p>
                    <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {player.role}
                    </span>
                    <div className="mt-4 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Matches:</span>
                        <span className="font-semibold">{player.stats?.matches}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Runs:</span>
                        <span className="font-semibold">{player.stats?.runs}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Average:</span>
                        <span className="font-semibold">{player.stats?.average}</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">Page {page}</span>
              <button
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Players;
