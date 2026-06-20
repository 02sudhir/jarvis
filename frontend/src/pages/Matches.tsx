import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api.service';

const Matches: React.FC = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const response = await apiService.getUpcomingMatches(50);
      setMatches(response.data.data || []);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Matches</h1>

      {/* Filters */}
      <div className="mb-8 flex gap-4">
        <select className="border rounded-lg px-4 py-2">
          <option>All Formats</option>
          <option>Test</option>
          <option>ODI</option>
          <option>T20</option>
        </select>
        <select className="border rounded-lg px-4 py-2">
          <option>All Status</option>
          <option>Live</option>
          <option>Upcoming</option>
          <option>Completed</option>
        </select>
      </div>

      {/* Matches List */}
      <div className="bg-white rounded-lg shadow">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading matches...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Match</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Format</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {matches.length > 0 ? (
                  matches.map((match: any, idx: number) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-semibold">{match.title}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {match.format}
                        </span>
                      </td>
                      <td className="px-6 py-4">{match.status}</td>
                      <td className="px-6 py-4">{match.startDate || '-'}</td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-800">
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-600">
                      No matches found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;
