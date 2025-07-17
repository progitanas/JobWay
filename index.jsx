import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Star, BookOpen, Award, TrendingUp, Users, Filter, Heart, Share2, Eye, Calendar, CheckCircle, Briefcase, GraduationCap, Target, Zap } from 'lucide-react';

const JobWayApp = () => {
  const [activeTab, setActiveTab] = useState('missions');
  const [selectedMission, setSelectedMission] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [likedMissions, setLikedMissions] = useState(new Set());
  const [userProgress, setUserProgress] = useState({
    completedMissions: 12,
    totalSkills: 28,
    certificates: 5,
    level: 'Expert Junior'
  });

  const missions = [
    {
      id: 1,
      title: "Assistant Marketing Digital",
      company: "TechStart Solutions",
      location: "Paris 9ème",
      duration: "7 jours",
      startDate: "2025-07-25",
      category: "Marketing",
      skills: ["Social Media", "Analytics", "Canva"],
      description: "Participe à la création de campagnes digitales et analyse les performances sur les réseaux sociaux.",
      salary: "350€",
      difficulty: "Débutant",
      rating: 4.8,
      applicants: 23,
      logo: "🚀",
      urgent: false,
      featured: true
    },
    {
      id: 2,
      title: "Développeur Frontend Junior",
      company: "WebCorp",
      location: "Lyon",
      duration: "10 jours",
      startDate: "2025-08-01",
      category: "Tech",
      skills: ["React", "CSS", "JavaScript"],
      description: "Développe des interfaces utilisateur modernes et participe aux revues de code avec l'équipe.",
      salary: "600€",
      difficulty: "Intermédiaire",
      rating: 4.9,
      applicants: 45,
      logo: "💻",
      urgent: true,
      featured: false
    },
    {
      id: 3,
      title: "Assistant Ressources Humaines",
      company: "People First",
      location: "Bordeaux",
      duration: "5 jours",
      startDate: "2025-07-30",
      category: "RH",
      skills: ["Recrutement", "Communication", "Excel"],
      description: "Assiste dans le processus de recrutement et participe aux entretiens d'embauche.",
      salary: "300€",
      difficulty: "Débutant",
      rating: 4.6,
      applicants: 18,
      logo: "👥",
      urgent: false,
      featured: false
    },
    {
      id: 4,
      title: "Consultant Data Analyst",
      company: "DataViz Pro",
      location: "Toulouse",
      duration: "8 jours",
      startDate: "2025-08-05",
      category: "Data",
      skills: ["Python", "SQL", "Tableau"],
      description: "Analyse des données clients et création de tableaux de bord interactifs.",
      salary: "500€",
      difficulty: "Avancé",
      rating: 4.7,
      applicants: 31,
      logo: "📊",
      urgent: false,
      featured: true
    }
  ];

  const certificates = [
    { name: "Marketing Digital", level: "Bronze", date: "2025-06-15", skills: ["SEO", "Social Media", "Analytics"] },
    { name: "Développement Web", level: "Argent", date: "2025-05-20", skills: ["HTML", "CSS", "JavaScript"] },
    { name: "Gestion de Projet", level: "Or", date: "2025-04-10", skills: ["Agile", "Scrum", "Leadership"] }
  ];

  const filteredMissions = missions.filter(mission => {
    const matchesSearch = mission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mission.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mission.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || mission.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleLike = (missionId) => {
    const newLiked = new Set(likedMissions);
    if (newLiked.has(missionId)) {
      newLiked.delete(missionId);
    } else {
      newLiked.add(missionId);
    }
    setLikedMissions(newLiked);
  };

  const MissionCard = ({ mission }) => (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${mission.featured ? 'border-blue-200' : 'border-gray-100'} hover:border-blue-300 group`}>
      {mission.featured && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-3 py-1 rounded-t-xl font-semibold">
          ⭐ Mission Vedette
        </div>
      )}
      {mission.urgent && (
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-3 py-1 rounded-t-xl font-semibold animate-pulse">
          🔥 Urgent - Places limitées
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{mission.logo}</div>
            <div>
              <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
                {mission.title}
              </h3>
              <p className="text-gray-600 font-medium">{mission.company}</p>
            </div>
          </div>
          <button
            onClick={() => toggleLike(mission.id)}
            className={`p-2 rounded-full transition-all duration-200 ${
              likedMissions.has(mission.id) 
                ? 'bg-red-100 text-red-500 hover:bg-red-200' 
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
          >
            <Heart className={`w-5 h-5 ${likedMissions.has(mission.id) ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{mission.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{mission.duration}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{mission.startDate}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{mission.applicants} candidats</span>
          </div>
        </div>

        <p className="text-gray-700 mb-4 line-clamp-2">{mission.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {mission.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{mission.rating}</span>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              mission.difficulty === 'Débutant' ? 'bg-green-100 text-green-700' :
              mission.difficulty === 'Intermédiaire' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {mission.difficulty}
            </span>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-green-600">{mission.salary}</div>
            <div className="text-xs text-gray-500">pour la mission</div>
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => setSelectedMission(mission)}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            Voir les détails
          </button>
          <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const ProgressCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-blue-300 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-800">{value}</div>
          <div className="text-sm text-gray-600">{title}</div>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className={`h-2 rounded-full ${color.replace('bg-', 'bg-').replace('-500', '-400')}`} style={{width: `${Math.min(value / 50 * 100, 100)}%`}}></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  JobWay
                </h1>
                <p className="text-xs text-gray-600">Découvre ton futur métier</p>
              </div>
            </div>
            
            <nav className="flex space-x-8">
              {[
                { id: 'missions', label: 'Missions', icon: Target },
                { id: 'profile', label: 'Profil', icon: GraduationCap },
                { id: 'certificates', label: 'Certificats', icon: Award }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === id
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'missions' && (
          <div>
            {/* Search and Filters */}
            <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher par titre, entreprise ou compétence..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="all">Toutes catégories</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Tech">Tech</option>
                    <option value="RH">RH</option>
                    <option value="Data">Data</option>
                  </select>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <span>Filtrer</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">247</div>
                <div className="text-gray-600">Missions disponibles</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">1,284</div>
                <div className="text-gray-600">Étudiants inscrits</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">96%</div>
                <div className="text-gray-600">Taux de satisfaction</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">€450</div>
                <div className="text-gray-600">Rémunération moyenne</div>
              </div>
            </div>

            {/* Mission Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMissions.map((mission) => (
                <MissionCard key={mission.id} mission={mission} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-8">
            {/* Profile Header */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  JD
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Jean Dupont</h2>
                  <p className="text-gray-600">Étudiant en Master Marketing Digital</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {userProgress.level}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">4.9/5</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <ProgressCard 
                  title="Missions terminées" 
                  value={userProgress.completedMissions} 
                  icon={CheckCircle} 
                  color="bg-green-500" 
                />
                <ProgressCard 
                  title="Compétences acquises" 
                  value={userProgress.totalSkills} 
                  icon={TrendingUp} 
                  color="bg-blue-500" 
                />
                <ProgressCard 
                  title="Certificats obtenus" 
                  value={userProgress.certificates} 
                  icon={Award} 
                  color="bg-purple-500" 
                />
                <ProgressCard 
                  title="Niveau d'expérience" 
                  value="Expert" 
                  icon={Zap} 
                  color="bg-orange-500" 
                />
              </div>
            </div>

            {/* Skills Progress */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Progression des compétences</h3>
              <div className="space-y-4">
                {[
                  { name: 'Marketing Digital', level: 85, color: 'bg-blue-500' },
                  { name: 'Développement Web', level: 72, color: 'bg-green-500' },
                  { name: 'Gestion de Projet', level: 90, color: 'bg-purple-500' },
                  { name: 'Analyse de Données', level: 65, color: 'bg-orange-500' }
                ].map((skill, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-32 text-sm font-medium text-gray-700">{skill.name}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${skill.color} transition-all duration-500`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <div className="text-sm font-semibold text-gray-600">{skill.level}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Mes Certificats</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert, index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-gray-100 hover:border-blue-300 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        cert.level === 'Or' ? 'bg-yellow-100 text-yellow-700' :
                        cert.level === 'Argent' ? 'bg-gray-100 text-gray-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {cert.level}
                      </div>
                      <Award className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{cert.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">Obtenu le {cert.date}</p>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mission Detail Modal */}
      {selectedMission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="text-4xl">{selectedMission.logo}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedMission.title}</h2>
                    <p className="text-gray-600 font-medium">{selectedMission.company}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMission(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Durée</div>
                    <div className="font-semibold">{selectedMission.duration}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Rémunération</div>
                    <div className="font-semibold text-green-600">{selectedMission.salary}</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Lieu</div>
                    <div className="font-semibold">{selectedMission.location}</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Début</div>
                    <div className="font-semibold">{selectedMission.startDate}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Description de la mission</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedMission.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Compétences développées</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMission.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                    Postuler maintenant
                  </button>
                  <button
                    onClick={() => toggleLike(selectedMission.id)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      likedMissions.has(selectedMission.id)
                        ? 'border-red-300 bg-red-50 text-red-600'
                        : 'border-gray-300 bg-gray-50 text-gray-600 hover:border-red-300 hover:bg-red-50'
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${likedMissions.has(selectedMission.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobWayApp;
