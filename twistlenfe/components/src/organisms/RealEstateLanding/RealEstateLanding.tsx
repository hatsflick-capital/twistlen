import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
  Alert,
  useWindowDimensions,
  Linking,
  Modal,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

interface FormData {
  name: string;
  phone: string;
  email: string;
  visitDate: string;
  usage: string;
}

const RealEstateLanding: React.FC = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const containerPadding = isMobile ? 24 : 48;

  const [showDocumentModal, setShowDocumentModal] = useState(false);

  const [selectedDocument, setSelectedDocument] = useState("");
  const [remainingPlots, setRemainingPlots] = useState(
    Math.floor(Math.random() * 5) + 1
  );
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 12,
    minutes: 30,
  });

  const [showSiteVisitModal, setShowSiteVisitModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    visitDate: "",
    purpose: "",
    propertyName: "",
    budget: "",
    message: "",
    usage: "",
  });
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newMinutes = prev.minutes - 1;
        if (newMinutes < 0) {
          const newHours = prev.hours - 1;
          if (newHours < 0) {
            const newDays = prev.days - 1;
            return newDays < 0
              ? { days: 0, hours: 0, minutes: 0 }
              : { days: newDays, hours: 23, minutes: 59 };
          }
          return { ...prev, hours: newHours, minutes: 59 };
        }
        return { ...prev, minutes: newMinutes };
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Validate form
      if (!formData.name.trim() || !formData.phone.trim()) {
        window.alert("Name and phone number are required!");
        setIsSubmitting(false);
        return;
      }

      // Prepare data for API
      const enquiryData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        visitDate: formData.visitDate,
        purpose: formData.purpose,
        propertyName: formData.propertyName,
        budget: formData.budget,
        message: formData.message,
        source: "mobile_app",
        submittedAt: new Date().toISOString(),
      };

      // Call your API
      const response = await fetch(
        "https://qy1otz3zh0.execute-api.ap-south-1.amazonaws.com/Prod/enquiries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(enquiryData),
        }
      );

      if (response.ok) {
        window.alert("Enquiry submitted successfully!");
        // Reset form and close modal
        setFormData({
          name: "",
          phone: "",
          email: "",
          visitDate: "",
          purpose: "",
          propertyName: "",
          budget: "",
          message: "",
          usage: "",
        });
        setShowSiteVisitModal(false);
      } else {
        Alert.alert("Error", "Failed to submit enquiry");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const highlights = [
    {
      icon: "location-city",
      title: "Prime Strategic Location",
      description:
        "Situated in a rapidly developing corridor with excellent access to major highways, business hubs, and lifestyle destinations.",
      color: "#B8860B",
    },
    {
      icon: "directions-transit",
      title: "Excellent Connectivity",
      description:
        "Quick access to metro routes, major roads, IT parks, schools, hospitals, and airports ensuring convenience and future growth.",
      color: "#1E40AF",
    },
    {
      icon: "security",
      title: "Secured Gated Layout",
      description:
        "Protected surroundings with controlled access, ensuring safety, privacy, and long-term property value.",
      color: "#059669",
    },
    {
      icon: "trending-up",
      title: "High Appreciation Potential",
      description:
        "Located in a growth hotspot where land value has shown consistent upward trends of 25-30% annually.",
      color: "#DC2626",
    },
    {
      icon: "verified",
      title: "Approved & Risk-Free Investment",
      description:
        "100% clear documentation, government-approved layout, and legal transparency with RERA certification.",
      color: "#7C3AED",
    },
    {
      icon: "business-center",
      title: "Versatile Usage",
      description:
        "Ideal for residential construction, rental homes, commercial offices, retail shops, or mixed-use developments.",
      color: "#EA580C",
    },
  ];

  const plotUsage = [
    {
      icon: "home-work",
      title: "Dream Home Construction",
      description:
        "Create a fully customised luxury villa or modern home with garden, private parking, terrace, swimming pool, or backyard leisure space.",
      color: "#0EA5E9",
    },
    {
      icon: "store",
      title: "Commercial Opportunity",
      description:
        "Develop rental units, office spaces, retail outlets, co-working hubs, or showrooms for steady passive income.",
      color: "#8B5CF6",
    },
    {
      icon: "savings",
      title: "Investment Asset",
      description:
        "Hold the land and benefit from rising market valuation with minimal maintenance costs.",
      color: "#10B981",
    },
    {
      icon: "apartment",
      title: "Rental Property Development",
      description:
        "Build duplex or multiple units to generate consistent monthly rental income.",
      color: "#F59E0B",
    },
    {
      icon: "family-restroom",
      title: "Future Security",
      description:
        "A long-term asset that can be passed down to future generations as sustainable wealth.",
      color: "#EC4899",
    },
  ];

  const locationAdvantages = [
    { icon: "🛣️", text: "5 mins to Highway Access" },
    { icon: "🚇", text: "10 mins to Metro Station" },
    { icon: "🏢", text: "15 mins to IT Park & Business hubs" },
    { icon: "🎓", text: "Premium Schools & Colleges nearby" },
    { icon: "🛒", text: "Supermarkets & Shopping Malls" },
    { icon: "🏥", text: "Multi-specialty Hospitals" },
    { icon: "🌳", text: "Parks & Recreational Areas" },
    { icon: "✈️", text: "25 mins to International Airport" },
  ];

  const testimonials = [
    {
      name: "Dr. Anjali Sharma",
      role: "Medical Professional",
      text: "The best plot investment I've made. Clear process and amazing location. Already appreciated 20% in 8 months!",
      rating: 5,
    },
    {
      name: "Mr. Rajiv Mehta",
      role: "Business Owner",
      text: "Perfect space for my future home. Highly recommended for anyone looking for secure land investment.",
      rating: 5,
    },
    {
      name: "Priya & Sameer K.",
      role: "NRI Investors",
      text: "Safe, transparent and excellent ROI opportunity. The documentation process was flawless.",
      rating: 5,
    },
  ];

  const documents = [
    { name: "Plot Layout Plan", icon: "map" },
    { name: "Government Approval Certificate", icon: "verified" },
    { name: "Legal Title Verification", icon: "gavel" },
    { name: "Development Plan Roadmap", icon: "landscape" },
  ];

  const gallery = [
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
    "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800",
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800",
  ];

  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitForm = () => {
    if (!formData.name || !formData.phone || !formData.email) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    if (remainingPlots > 0) {
      setRemainingPlots((prev) => prev - 1);
    }

    Alert.alert(
      "Success",
      "Our premium property advisor will contact you within 20 minutes to schedule your exclusive site visit."
    );
    setFormData({
      name: "",
      phone: "",
      email: "",
      visitDate: "",
      purpose: "",
      propertyName: "",
      budget: "",
      message: "",
      usage: "",
    });
  };

  const handleWhatsApp = () => {
    const message =
      "Hi, I am interested in your premium plots in Harirajpur. Please share available sizes and pricing immediately.";
    const url = `https://wa.me/919337802797?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  const handleCall = () => {
    Linking.openURL("tel:+919337802797");
  };

  const handleDocumentPress = (docName: string) => {
    setSelectedDocument(docName);
    setShowDocumentModal(true);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Document Modal */}
      <Modal
        visible={showSiteVisitModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSiteVisitModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-2xl m-4 p-6 w-[90%] max-w-md">
            {/* Close Button */}
            <TouchableOpacity
              onPress={() => setShowSiteVisitModal(false)}
              className="absolute top-4 right-4 z-10"
            >
              <Text className="text-gray-500 text-2xl">×</Text>
            </TouchableOpacity>

            {/* Brand Header */}
            <View className="items-center mb-6">
              <Text className="text-gray-900 font-bold text-2xl uppercase tracking-wider">
                TWISTLEN
              </Text>
              <Text className="text-blue-600 text-sm mt-1">
                An Orbitaven Venture
              </Text>
              <Text className="text-gray-700 text-lg mt-4 text-center font-medium">
                Submit Your Enquiry
              </Text>
            </View>

            {/* Primary Fields (Always Visible) */}
            {[
              {
                label: "Full Name *",
                key: "name",
                placeholder: "Enter your full name",
              },
              {
                label: "Phone Number *",
                key: "phone",
                placeholder: "10-digit mobile number",
                keyboardType: "phone-pad",
                maxLength: 10,
              },
            ].map((field) => (
              <View key={field.key} className="mb-4">
                <Text className="text-gray-800 font-medium mb-2 text-sm">
                  {field.label}
                </Text>
                <TextInput
                  placeholder={field.placeholder}
                  value={formData[field.key as keyof typeof formData]}
                  onChangeText={(v) => {
                    // For phone, only allow numbers
                    if (field.key === "phone") {
                      const numbers = v.replace(/[^0-9]/g, "");
                      handleFormChange(
                        field.key as keyof typeof formData,
                        numbers
                      );
                    } else {
                      handleFormChange(field.key as keyof typeof formData, v);
                    }
                  }}
                  className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-base"
                  placeholderTextColor="#9CA3AF"
                  keyboardType={field.keyboardType || "default"}
                  maxLength={field.maxLength}
                />
              </View>
            ))}

            {/* Expand/Collapse Button */}
            <TouchableOpacity
              onPress={() => setShowOptionalFields(!showOptionalFields)}
              className="flex-row items-center justify-between mb-4 p-3 bg-gray-100 rounded-lg"
              activeOpacity={0.7}
            >
              <Text className="text-gray-700 font-medium">
                {showOptionalFields
                  ? "Hide optional details"
                  : "Add more details (optional)"}
              </Text>
              <Text className="text-blue-600 text-lg font-bold">
                {showOptionalFields ? "−" : "+"}
              </Text>
            </TouchableOpacity>

            {/* Optional Fields */}
            {showOptionalFields &&
              [
                {
                  label: "Email Address",
                  key: "email",
                  placeholder: "your@email.com",
                  keyboardType: "email-address",
                },
                {
                  label: "Preferred Visit Date",
                  key: "visitDate",
                  placeholder: "DD/MM/YYYY",
                },
                {
                  label: "Purpose",
                  key: "purpose",
                  placeholder: "Home / Investment / Business",
                },
                {
                  label: "Property Name",
                  key: "propertyName",
                  placeholder: "Enter property name if any",
                },
                {
                  label: "Budget",
                  key: "budget",
                  placeholder: "e.g., 50L, 1Cr, 2.5Cr",
                },
                {
                  label: "Message",
                  key: "message",
                  placeholder: "Any additional information",
                  multiline: true,
                },
              ].map((field) => (
                <View key={field.key} className="mb-4">
                  <Text className="text-gray-800 font-medium mb-2 text-sm">
                    {field.label}
                  </Text>
                  {field.key === "visitDate" ? (
                    <TextInput
                      placeholder={field.placeholder}
                      value={formData[field.key as keyof typeof formData]}
                      onChangeText={(v) => {
                        // Format date as user types DD/MM/YYYY
                        let formattedText = v.replace(/[^0-9]/g, "");
                        if (formattedText.length > 2) {
                          formattedText =
                            formattedText.slice(0, 2) +
                            "/" +
                            formattedText.slice(2);
                        }
                        if (formattedText.length > 5) {
                          formattedText =
                            formattedText.slice(0, 5) +
                            "/" +
                            formattedText.slice(5, 9);
                        }
                        handleFormChange(
                          field.key as keyof typeof formData,
                          formattedText
                        );
                      }}
                      className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-base"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="numeric"
                      maxLength={10}
                    />
                  ) : (
                    <TextInput
                      placeholder={field.placeholder}
                      value={formData[field.key as keyof typeof formData]}
                      onChangeText={(v) =>
                        handleFormChange(field.key as keyof typeof formData, v)
                      }
                      className={`px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-base ${field.multiline ? "h-24" : ""}`}
                      placeholderTextColor="#9CA3AF"
                      keyboardType={field.keyboardType || "default"}
                      multiline={field.multiline}
                      numberOfLines={field.multiline ? 4 : 1}
                      textAlignVertical={field.multiline ? "top" : "center"}
                    />
                  )}
                </View>
              ))}

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isSubmitting}
              className={`mt-4 py-3 rounded-lg ${isSubmitting ? "bg-blue-400" : "bg-blue-600"}`}
              activeOpacity={0.8}
            >
              <Text className="text-white text-center font-bold text-base">
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
              </Text>
            </TouchableOpacity>

            {/* Privacy Note */}
            <Text className="text-gray-500 text-xs text-center mt-4">
              By submitting, you agree to our Terms of Service and Privacy
              Policy.
            </Text>
          </View>
        </View>
      </Modal>

      {/* Site Visit Modal */}
      <Modal
        visible={showSiteVisitModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSiteVisitModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-2xl mx-6 p-6 w-11/12 max-w-md">
            <Text className="text-xl font-bold text-gray-900 text-center mb-2">
              Schedule Site Visit
            </Text>
            <Text className="text-gray-600 text-center mb-6">
              Our property advisor will contact you to schedule your exclusive
              site tour
            </Text>

            {[
              {
                label: "Full Name *",
                key: "name",
                placeholder: "Enter your full name",
              },
              {
                label: "Phone Number *",
                key: "phone",
                placeholder: "+91 XXXXX XXXXX",
              },
            ].map((field) => (
              <View key={field.key} className="mb-4">
                <Text className="text-gray-900 font-semibold mb-2 text-sm">
                  {field.label}
                </Text>
                <TextInput
                  placeholder={field.placeholder}
                  value={formData[field.key as keyof FormData]}
                  onChangeText={(v) =>
                    handleFormChange(field.key as keyof FormData, v)
                  }
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base"
                  placeholderTextColor="#9CA3AF"
                  keyboardType={field.key === "phone" ? "phone-pad" : "default"}
                />
              </View>
            ))}

            {/* Expand/Collapse Button */}
            <TouchableOpacity
              onPress={() => setShowOptionalFields(!showOptionalFields)}
              className="flex-row items-center justify-between mb-4 p-3 bg-gray-50 rounded-xl"
              activeOpacity={0.7}
            >
              <Text className="text-gray-700 font-medium">
                {showOptionalFields
                  ? "Hide optional details"
                  : "Add more details (optional)"}
              </Text>
              <Text className="text-blue-600 text-lg font-bold">
                {showOptionalFields ? "−" : "+"}
              </Text>
            </TouchableOpacity>

            {/* Optional Fields */}
            {showOptionalFields &&
              [
                {
                  label: "Email Address",
                  key: "email",
                  placeholder: "your@email.com",
                },
                {
                  label: "Preferred Visit Date",
                  key: "visitDate",
                  placeholder: "DD/MM/YYYY",
                  isDate: true,
                },
                {
                  label: "Purpose",
                  key: "usage",
                  placeholder: "Home / Investment / Business",
                },
              ].map((field) => (
                <View key={field.key} className="mb-4">
                  <Text className="text-gray-900 font-semibold mb-2 text-sm">
                    {field.label}
                  </Text>
                  {field.isDate ? (
                    <TextInput
                      placeholder={field.placeholder}
                      value={formData[field.key as keyof FormData]}
                      onChangeText={(v) =>
                        handleFormChange(field.key as keyof FormData, v)
                      }
                      className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="numeric"
                      maxLength={10}
                    />
                  ) : (
                    <TextInput
                      placeholder={field.placeholder}
                      value={formData[field.key as keyof FormData]}
                      onChangeText={(v) =>
                        handleFormChange(field.key as keyof FormData, v)
                      }
                      className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base"
                      placeholderTextColor="#9CA3AF"
                      keyboardType={
                        field.key === "email" ? "email-address" : "default"
                      }
                    />
                  )}
                </View>
              ))}

            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-gradient-to-r from-blue-600 to-purple-600 py-4 rounded-xl items-center mt-2"
            >
              <Text className="text-white text-center font-bold text-base">
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowSiteVisitModal(false)}
              className="border border-gray-300 py-4 rounded-xl items-center mt-3"
            >
              <Text className="text-gray-700 font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Sticky Bottom CTA - Mobile Optimized */}
      <View className="absolute bottom-4 left-4 right-4 z-50">
        <View className="bg-white rounded-2xl p-3 shadow-2xl shadow-black/40 border border-gray-200 self-center">
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={handleCall}
              className="flex-row items-center gap-2 bg-blue-600 px-3 py-2 rounded-full"
            >
              <MaterialIcons name="call" size={14} color="#fff" />
              <Text className="text-white font-semibold text-xs">Call</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleWhatsApp}
              className="flex-row items-center gap-2 bg-green-500 px-3 py-2 rounded-full"
            >
              <MaterialCommunityIcons name="whatsapp" size={14} color="#fff" />
              <Text className="text-white font-semibold text-xs">WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowSiteVisitModal(true)}
              className="flex-row items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 px-3 py-2 rounded-full"
            >
              <MaterialIcons name="calendar-today" size={14} color="#fff" />
              <Text className="text-white font-semibold text-xs">Visit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 pb-24">
        {/* 1. IMMERSIVE HERO SECTION */}
        <View>
          <ImageBackground
            source={{
              uri: "https://i.ibb.co/HT06yvs5/Whats-App-Image-2025-11-23-at-22-55-06-1.jpg",
            }}
            className="h-100 justify-center items-center"
            imageStyle={{ opacity: 0.9 }}
          >
            <LinearGradient
              colors={["rgba(0,0,0,0.8)", "rgba(0,0,0,0.4)"]}
              className="absolute inset-0"
            />
            <View className="px-6 py-8 items-center w-full">
              <Text className="text-white text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6 tracking-tight leading-tight">
                Premium Plots in Harirajpur, Just Minutes from XIM University,
                Bhubaneswar
              </Text>
              {/* <Text className="text-white text-sm md:text-lg text-center mb-6 md:mb-8 leading-6 md:leading-8 max-w-3xl">
              Own a rare piece of prime land in one of the fastest-growing
              zones. This premium plot gives you the power to design your dream
              home, build a profitable commercial property, or secure a
              high-growth asset for the future.
            </Text> */}

              {/* Enhanced Trust Components Bar */}
              <View className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 mb-6 md:mb-8 border border-white/20 w-full max-w-4xl">
                {/* Live Demand Indicator */}
                <View className="flex-col md:flex-row justify-between items-center mb-4 p-3 bg-white/5 rounded-xl border border-white/10">
                  <View className="flex-col md:flex-row items-center gap-3">
                    <View className="flex-row items-center gap-2">
                      <View className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                      <Text className="text-white font-semibold text-sm">
                        {Math.floor(Math.random() * 10) + 1} People Viewing Now
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <MaterialIcons
                        name="check-circle"
                        size={16}
                        color="#10B981"
                      />
                      <Text className="text-white font-semibold text-sm">
                        {Math.floor(Math.random() * 5) + 1} Plots Booked Today
                      </Text>
                    </View>
                  </View>

                  {/* Plot Availability Badge */}
                  <View className="flex-row items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-400/30 my-2 md:m-0">
                    <View className="w-2 h-2 bg-green-400 rounded-full" />
                    <Text className="text-green-300 font-bold text-sm">
                      Only {remainingPlots} Left
                    </Text>
                  </View>
                </View>

                {/* Smart ROI Snapshot */}
                <View className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 mb-4 border border-blue-400/30">
                  <Text className="text-white font-bold text-center mb-2 text-lg">
                    Better Returns Than Stocks & Mutual Funds
                  </Text>
                  <View className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <View className="text-center">
                      <Text className="text-yellow-300 text-2xl font-bold">
                        25%
                      </Text>
                      <Text className="text-blue-200 text-sm">
                        Annual Appreciation
                      </Text>
                    </View>
                    <View className="text-center">
                      <Text className="text-green-300 text-2xl font-bold">
                        ₹85L → ₹1.2Cr
                      </Text>
                      <Text className="text-blue-200 text-sm">
                        3 Year Growth
                      </Text>
                    </View>
                    <View className="text-center">
                      <Text className="text-white text-2xl font-bold">
                        2.5x
                      </Text>
                      <Text className="text-blue-200 text-sm">
                        Better Than Stocks
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Key Highlights Grid */}
                <View className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Location Advantages */}
                  <View className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <View className="flex-row items-center gap-2 mb-3">
                      <MaterialIcons
                        name="location-on"
                        size={20}
                        color="#60A5FA"
                      />
                      <Text className="text-white font-semibold text-lg">
                        Prime Location
                      </Text>
                    </View>
                    <View className="space-y-2">
                      {[
                        "5 mins to Xavier's High School",
                        "XIM University Campus (Plot No. 12(A), Nijigada Kurki, Harirajpur)",
                        "Bhubaneswar Airport (about 12 km away)",
                        "Hari Bhaina Chowk (local attraction in Harirajpur)",
                        "Barunei Hill (nearby attraction in Harirajpur area)",
                      ].map((item, idx) => (
                        <View key={idx} className="flex-row items-center gap-2">
                          <MaterialIcons
                            name="check"
                            size={16}
                            color="#10B981"
                          />
                          <Text className="text-white text-sm">{item}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* Upcoming Projects */}
                  <View className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <View className="flex-row items-center gap-2 mb-3">
                      <MaterialIcons name="update" size={20} color="#F59E0B" />
                      <Text className="text-white font-semibold text-lg">
                        Upcoming Projects
                      </Text>
                    </View>
                    <View className="space-y-2">
                      {[
                        "Electronic Manufacturing Units (Public-Private Partnership)",
                        "Parks & Multi-Storey Commercial Towers",
                        "441.5 Acres IT Park Expansion (Odisha Govt)",
                        "Premium Shopping Mall Complex",
                      ].map((item, idx) => (
                        <View key={idx} className="flex-row items-center gap-2">
                          <MaterialIcons
                            name="check-circle"
                            size={16}
                            color="#F59E0B"
                          />
                          <Text className="text-white text-sm">{item}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* Investment Security */}
                  <View className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <View className="flex-row items-center gap-2 mb-3">
                      <MaterialIcons
                        name="verified"
                        size={20}
                        color="#10B981"
                      />
                      <Text className="text-white font-semibold text-lg">
                        Investment Security
                      </Text>
                    </View>
                    <View className="space-y-2">
                      <View className="flex-row justify-between">
                        <Text className="text-white text-sm">2021-2022</Text>
                        <Text className="text-green-400 text-sm font-semibold">
                          +18%
                        </Text>
                      </View>
                      <View className="flex-row justify-between">
                        <Text className="text-white text-sm">2022-2023</Text>
                        <Text className="text-green-400 text-sm font-semibold">
                          +22%
                        </Text>
                      </View>
                      <View className="flex-row justify-between">
                        <Text className="text-white text-sm">2023-2024</Text>
                        <Text className="text-green-400 text-sm font-semibold">
                          +25%
                        </Text>
                      </View>
                      <View className="flex-row justify-between items-center mt-2 pt-2 border-t border-white/20">
                        <Text className="text-white text-sm font-semibold">
                          Average
                        </Text>
                        <Text className="text-yellow-400 text-sm font-bold">
                          +21.7% yearly
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Risk-Removal Message */}
                <View className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                  <Text className="text-white text-center text-sm italic">
                    No booking pressure. Visit first. Decide later. Your
                    investment is protected with 100% clear titles.
                  </Text>
                </View>
              </View>

              {/* Interactive Location Preview */}
              <TouchableOpacity
                className="bg-blue-500/20 px-4 py-2 rounded-full border border-blue-400/30 flex-row items-center gap-2 mb-4"
                onPress={() =>
                  Linking.openURL(
                    "https://www.google.com/maps/place/20%C2%B009'12.9%22N+85%C2%B046'26.8%22E/@20.153571,85.774113,17z"
                  )
                }
              >
                <MaterialIcons name="map" size={16} color="#60A5FA" />
                <Text className="text-blue-200 font-semibold text-sm">
                  View Exact Plot Location
                </Text>
                <MaterialIcons name="chevron-right" size={16} color="#60A5FA" />
              </TouchableOpacity>

              {/* Final Urgency & Trust Badge */}
              {/* <View className="bg-gradient-to-r from-red-500/30 to-orange-500/30 px-4 py-2 rounded-full border border-red-400/30 flex-row items-center gap-2">
              <MaterialIcons name="flash-on" size={16} color="#FBBF24" />
              <Text className="text-white font-bold text-sm">
                ⚡ Only {remainingPlots} Premium Plots Available • 7 People
                Viewing Now
              </Text>
            </View> */}
            </View>
          </ImageBackground>
        </View>

        {/* 3. COMPLETE PLOT OVERVIEW */}
        <View className="bg-gradient-to-br from-gray-900 to-blue-900 py-12 md:py-20">
          <View style={{ paddingHorizontal: containerPadding }}>
            <Text className="text-3xl md:text-4xl font-bold text-center text-white mb-4 md:mb-6">
              Plot Specifications
            </Text>
            <Text className="text-blue-200 text-center text-sm md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto">
              Every detail meticulously planned for your premium investment
              experience
            </Text>

            <View className="max-w-6xl mx-auto">
              {/* Main Specifications Card */}
              <View className="bg-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl">
                {/* Header */}
                <View className="flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8">
                  <View className="mb-4 md:mb-0">
                    <Text className="text-xl md:text-2xl font-bold text-white">
                      Twistlen
                    </Text>
                    <Text className="text-blue-200 text-sm md:text-base">
                      Premium Residential Plots
                    </Text>
                  </View>
                  <View className="bg-green-500/20 px-3 py-1 rounded-full border border-green-400/30 self-start">
                    <Text className="text-green-300 font-semibold text-xs">
                      Ready for Registration
                    </Text>
                  </View>
                </View>

                {/* Specifications Grid */}
                <View className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                  {/* Left Column */}
                  <View className="space-y-3 md:space-y-4">
                    <View className="bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10">
                      <View className="flex-row items-center gap-3 mb-2 md:mb-3">
                        <View className="w-8 h-8 md:w-10 md:h-10 bg-blue-500/20 rounded-lg justify-center items-center">
                          <MaterialIcons
                            name="category"
                            size={16}
                            color="#60A5FA"
                          />
                        </View>
                        <View>
                          <Text className="text-gray-300 text-xs md:text-sm">
                            Plot Type
                          </Text>
                          <Text className="text-white text-base md:text-lg font-semibold">
                            Premium Residential
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View className="bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10">
                      <View className="flex-row items-center gap-3 mb-2 md:mb-3">
                        <View className="w-8 h-8 md:w-10 md:h-10 bg-green-500/20 rounded-lg justify-center items-center">
                          <MaterialIcons
                            name="aspect-ratio"
                            size={16}
                            color="#34D399"
                          />
                        </View>
                        <View>
                          <Text className="text-gray-300 text-xs md:text-sm">
                            Total Area
                          </Text>
                          <Text className="text-white text-base md:text-lg font-semibold">
                            1,800 Sq.Yards
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View className="bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10">
                      <View className="flex-row items-center gap-3 mb-2 md:mb-3">
                        <View className="w-8 h-8 md:w-10 md:h-10 bg-purple-500/20 rounded-lg justify-center items-center">
                          <MaterialIcons
                            name="straighten"
                            size={16}
                            color="#A78BFA"
                          />
                        </View>
                        <View>
                          <Text className="text-gray-300 text-xs md:text-sm">
                            Dimensions
                          </Text>
                          <Text className="text-white text-base md:text-lg font-semibold">
                            30ft x 60ft
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View className="bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10">
                      <View className="flex-row items-center gap-3 mb-2 md:mb-3">
                        <View className="w-8 h-8 md:w-10 md:h-10 bg-yellow-500/20 rounded-lg justify-center items-center">
                          <MaterialIcons
                            name="attach-money"
                            size={16}
                            color="#FBBF24"
                          />
                        </View>
                        <View>
                          <Text className="text-gray-300 text-xs md:text-sm">
                            Price Range
                          </Text>
                          <Text className="text-white text-base md:text-lg font-semibold">
                            ₹1,050 - ₹2,000/Sq.Ft
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Right Column */}
                  <View className="space-y-3 md:space-y-4">
                    <View className="bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10">
                      <View className="flex-row items-center gap-3 mb-2 md:mb-3">
                        <View className="w-8 h-8 md:w-10 md:h-10 bg-red-500/20 rounded-lg justify-center items-center">
                          <MaterialIcons
                            name="explore"
                            size={16}
                            color="#F87171"
                          />
                        </View>
                        <View>
                          <Text className="text-gray-300 text-xs md:text-sm">
                            Facing
                          </Text>
                          <Text className="text-white text-base md:text-lg font-semibold">
                            East / West
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View className="bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10">
                      <View className="flex-row items-center gap-3 mb-2 md:mb-3">
                        <View className="w-8 h-8 md:w-10 md:h-10 bg-indigo-500/20 rounded-lg justify-center items-center">
                          <FontAwesome name="road" size={16} color="#818CF8" />
                        </View>
                        <View>
                          <Text className="text-gray-300 text-xs md:text-sm">
                            Road Width
                          </Text>
                          <Text className="text-white text-base md:text-lg font-semibold">
                            80 Feet Main Road
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View className="bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10">
                      <View className="flex-row items-center gap-3 mb-2 md:mb-3">
                        <View className="w-8 h-8 md:w-10 md:h-10 bg-teal-500/20 rounded-lg justify-center items-center">
                          <MaterialIcons
                            name="business"
                            size={16}
                            color="#2DD4BF"
                          />
                        </View>
                        <View>
                          <Text className="text-gray-300 text-xs md:text-sm">
                            Ownership
                          </Text>
                          <Text className="text-white text-base md:text-lg font-semibold">
                            Freehold
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View className="bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10">
                      <View className="flex-row items-center gap-3 mb-2 md:mb-3">
                        <View className="w-8 h-8 md:w-10 md:h-10 bg-pink-500/20 rounded-lg justify-center items-center">
                          <MaterialIcons
                            name="verified"
                            size={16}
                            color="#F472B6"
                          />
                        </View>
                        <View>
                          <Text className="text-gray-300 text-xs md:text-sm">
                            Status
                          </Text>
                          <Text className="text-white text-base md:text-lg font-semibold">
                            Ready for Registration
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Developer Information */}
                <View className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl md:rounded-2xl p-4 md:p-6 border border-blue-400/30">
                  <View className="flex-row items-start gap-3 md:gap-4">
                    <View className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl justify-center items-center">
                      <MaterialIcons
                        name="apartment"
                        size={20}
                        color="#60A5FA"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-white text-lg md:text-xl font-bold mb-1 md:mb-2">
                        Twistlen
                      </Text>
                      <View className="flex-row flex-wrap gap-2 md:gap-4 mb-2 md:mb-3">
                        <View className="flex-row items-center gap-1 md:gap-2">
                          <MaterialIcons
                            name="history"
                            size={12}
                            color="#93C5FD"
                          />
                          <Text className="text-blue-200 text-xs md:text-sm">
                            15+ Years
                          </Text>
                        </View>
                        <View className="flex-row items-center gap-1 md:gap-2">
                          <MaterialIcons
                            name="workspaces"
                            size={12}
                            color="#93C5FD"
                          />
                          <Text className="text-blue-200 text-xs md:text-sm">
                            25+ Projects
                          </Text>
                        </View>
                        <View className="flex-row items-center gap-1 md:gap-2">
                          <MaterialIcons
                            name="star"
                            size={12}
                            color="#FBBF24"
                          />
                          <Text className="text-yellow-300 text-xs md:text-sm">
                            4.9/5 Rating
                          </Text>
                        </View>
                      </View>
                      <Text className="text-blue-200 italic text-xs md:text-sm">
                        "Transparent dealings and premium quality land
                        development."
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Quick Stats */}
                <View className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-4 md:mt-6">
                  <View className="bg-white/5 rounded-lg md:rounded-xl p-3 md:p-4 border border-white/10 items-center">
                    <Text className="text-white text-xl md:text-2xl font-bold">
                      15+
                    </Text>
                    <Text className="text-blue-200 text-xs text-center">
                      Years Exp
                    </Text>
                  </View>
                  <View className="bg-white/5 rounded-lg md:rounded-xl p-3 md:p-4 border border-white/10 items-center">
                    <Text className="text-white text-xl md:text-2xl font-bold">
                      25+
                    </Text>
                    <Text className="text-blue-200 text-xs text-center">
                      Projects
                    </Text>
                  </View>
                  <View className="bg-white/5 rounded-lg md:rounded-xl p-3 md:p-4 border border-white/10 items-center">
                    <Text className="text-white text-xl md:text-2xl font-bold">
                      500+
                    </Text>
                    <Text className="text-blue-200 text-xs text-center">
                      Clients
                    </Text>
                  </View>
                  <View className="bg-white/5 rounded-lg md:rounded-xl p-3 md:p-4 border border-white/10 items-center">
                    <Text className="text-white text-xl md:text-2xl font-bold">
                      4.9
                    </Text>
                    <Text className="text-blue-200 text-xs text-center">
                      Rating
                    </Text>
                  </View>
                </View>
              </View>

              {/* Urgency Section */}
              <View className="mt-6 md:mt-8 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl md:rounded-2xl p-4 md:p-6 border border-red-400/30">
                <View className="flex-col gap-4">
                  {/* Content Section */}
                  <View className="flex-row items-start gap-3">
                    <View className="flex-1">
                      <Text className="text-white font-semibold text-base md:text-lg">
                        Limited Opportunity
                      </Text>
                      <Text className="text-yellow-200 text-xs md:text-sm mt-1">
                        Only {remainingPlots} plots remaining at launch prices
                      </Text>
                    </View>
                  </View>

                  {/* CTA Button - Full Width on Mobile */}
                  <TouchableOpacity
                    onPress={() => setShowSiteVisitModal(true)}
                    className="bg-red-500 px-2 md:px-4 py-1 md:py-2 rounded-full items-center self-start"
                  >
                    <Text className="text-white font-semibold text-xs md:text-sm">
                      Reserve Now
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* 2. TRUST & TRANSPARENCY SHOWCASE */}
        <View className="bg-gradient-to-br from-gray-900 to-blue-900 py-12 md:py-20">
          <View style={{ paddingHorizontal: containerPadding }}>
            <Text className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
              Why Buyers Trust This Plot
            </Text>
            <Text className="text-blue-200 text-center text-sm md:text-lg mb-8 md:mb-16 max-w-2xl mx-auto">
              Complete transparency and verified authenticity for your peace of
              mind
            </Text>

            <View className="max-w-6xl mx-auto space-y-8 md:space-y-12">
              {/* 1. Plot Verification Snapshot */}
              <View className="bg-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20">
                <View className="flex-row items-center gap-3 mb-4 md:mb-6">
                  <MaterialIcons name="verified" size={24} color="#10B981" />
                  <Text className="text-white text-xl md:text-2xl font-bold">
                    Plot Verification
                  </Text>
                </View>

                <View className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                  {[
                    {
                      text: "Govt Approved Layout",
                      icon: "assignment",
                    },
                    { text: "Clear Title & Encumbrance-Free", icon: "gavel" },
                    { text: "Ready-to-Register", icon: "how-to-reg" },
                    { text: "Boundary Marked On-Site", icon: "fence" },
                    {
                      text: "Legal Advisor Verified",
                      icon: "balance",
                    },
                    { text: "RERA Approved", icon: "verified-user" },
                  ].map((item, idx) => (
                    <View
                      key={idx}
                      className="flex-row items-center gap-2 md:gap-3 bg-white/5 rounded-lg md:rounded-xl p-3 md:p-4 border border-white/10"
                    >
                      <MaterialIcons
                        name={item.icon as any}
                        size={16}
                        color="#10B981"
                      />
                      <Text className="text-white text-xs md:text-sm flex-1">
                        {item.text}
                      </Text>
                    </View>
                  ))}
                </View>

                <Text className="text-blue-200 text-center italic text-xs md:text-sm">
                  Every detail verified for safe and legally sound investment.
                </Text>
              </View>

              {/* 2. Real Ownership Transparency Panel */}
              <View className="bg-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20">
                <View className="flex-row items-center gap-3 mb-4 md:mb-6">
                  <MaterialIcons name="visibility" size={24} color="#60A5FA" />
                  <Text className="text-white text-xl md:text-2xl font-bold">
                    Ownership Transparency
                  </Text>
                </View>

                <View className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  <View className="space-y-3 md:space-y-4">
                    <View className="bg-white/5 rounded-lg md:rounded-xl p-3 md:p-4 border border-white/10">
                      <Text className="text-gray-300 text-xs md:text-sm mb-1">
                        Plot Coordinates
                      </Text>
                      <Text className="text-white font-semibold text-sm md:text-base">
                        20°09'12.9"N 85°46'26.8"E
                      </Text>
                    </View>
                    <View className="bg-white/5 rounded-lg md:rounded-xl p-3 md:p-4 border border-white/10">
                      <Text className="text-gray-300 text-xs md:text-sm mb-1">
                        Survey Number
                      </Text>
                      <Text className="text-white font-semibold text-sm md:text-base">
                        Survey No. 125/AB/NCL
                      </Text>
                    </View>
                    <View className="bg-white/5 rounded-lg md:rounded-xl p-3 md:p-4 border border-white/10">
                      <Text className="text-gray-300 text-xs md:text-sm mb-1">
                        Registration
                      </Text>
                      <Text className="text-white font-semibold text-sm md:text-base">
                        Doc. No. 4567/2024
                      </Text>
                    </View>
                  </View>

                  <View className="bg-white/5 rounded-lg md:rounded-xl p-3 md:p-4 border border-white/10">
                    <Text className="text-white font-semibold mb-2 md:mb-3 text-center text-sm md:text-base">
                      On-ground Verification
                    </Text>
                    <Image
                      source={{
                        uri: "https://i.ibb.co/xtLvvRvq/Whats-App-Image-2025-11-23-at-22-55-05.jpg",
                      }}
                      className="w-full h-28 md:h-40 rounded-lg mb-2"
                    />
                    <Text className="text-blue-200 text-xs text-center">
                      Verified: Nov 15, 2025
                    </Text>
                  </View>
                </View>

                <Text className="text-white text-center mt-4 md:mt-6 font-semibold text-sm md:text-base">
                  What you see is exactly what you buy. No hidden clauses.
                </Text>
              </View>

              {/* 3. Real Buyer Confidence Section */}
              <View className="bg-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20">
                <View className="flex-row items-center gap-3 mb-4 md:mb-6">
                  <MaterialIcons name="group" size={24} color="#F59E0B" />
                  <Text className="text-white text-xl md:text-2xl font-bold">
                    Verified Buyer Experiences
                  </Text>
                </View>

                <View className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {[
                    {
                      name: "Rajiv Mohanty",
                      city: "Bhadrak",
                      purchaseDate: "Nov 2025",
                      purpose: "Investment",
                      feedback:
                        "I visited the site twice before booking. The documentation was clear and the team explained everything transparently.",
                      rating: 5,
                    },
                    {
                      name: "Priya Sharma",
                      city: "Bhubaneswar",
                      purchaseDate: "Nov 2025",
                      purpose: "Dream Home",
                      feedback:
                        "The legal verification process was thorough. Feel completely secure about my investment.",
                      rating: 4,
                    },
                    {
                      name: "Arun Kumar",
                      city: "Rourkela",
                      purchaseDate: "Oct 2025",
                      purpose: "Commercial",
                      feedback:
                        "Best decision! Clear titles and professional handling. Already 15% appreciation.",
                      rating: 4,
                    },
                    {
                      name: "Sunita Ghosh",
                      city: "Kolkata",
                      purchaseDate: "Sep 2025",
                      purpose: "Retirement Home",
                      feedback:
                        "Transparent pricing and excellent location. Perfect for long-term investment.",
                      rating: 5,
                    },
                  ].map((buyer, idx) => (
                    <View
                      key={idx}
                      className="bg-white/5 rounded-lg md:rounded-xl p-4 md:p-6 border border-white/10"
                    >
                      <View className="flex-row justify-between items-start mb-2 md:mb-3">
                        <View>
                          <Text className="text-white font-bold text-base md:text-lg">
                            {buyer.name}
                          </Text>
                          <Text className="text-blue-200 text-xs md:text-sm">
                            {buyer.city} • {buyer.purchaseDate}
                          </Text>
                        </View>
                        <View className="bg-green-500/20 px-2 md:px-3 py-1 rounded-full">
                          <Text className="text-green-300 text-xs font-semibold">
                            {buyer.purpose}
                          </Text>
                        </View>
                      </View>

                      <View className="flex-row gap-1 mb-2 md:mb-3">
                        {[...Array(buyer.rating)].map((_, i) => (
                          <MaterialIcons
                            key={i}
                            name="star"
                            size={14}
                            color="#F59E0B"
                          />
                        ))}
                      </View>

                      <Text className="text-white text-xs md:text-sm leading-5 md:leading-6 italic">
                        "{buyer.feedback}"
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* 4. On-Ground Development Proof */}
              <View className="bg-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20">
                <View className="flex-row items-center gap-3 mb-4 md:mb-6">
                  <MaterialIcons
                    name="construction"
                    size={24}
                    color="#34D399"
                  />
                  <Text className="text-white text-xl md:text-2xl font-bold">
                    Development Proof
                  </Text>
                </View>

                <View className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                  <View className="space-y-3 md:space-y-4">
                    <View className="bg-white/5 rounded-lg md:rounded-xl p-3 md:p-4 border border-white/10">
                      <Text className="text-white font-semibold mb-1 md:mb-2 text-sm md:text-base">
                        Road Development
                      </Text>
                      <Image
                        source={{
                          uri: "https://i.ibb.co/xtLvvRvq/Whats-App-Image-2025-11-23-at-22-55-05.jpg",
                        }}
                        className="w-full h-24 md:h-32 rounded-lg"
                      />
                      <Text className="text-blue-200 text-xs mt-1 md:mt-2">
                        80ft road construction completed
                      </Text>
                    </View>
                    <View className="bg-white/5 rounded-lg md:rounded-xl p-3 md:p-4 border border-white/10">
                      <Text className="text-white font-semibold mb-1 md:mb-2 text-sm md:text-base">
                        Boundary Wall
                      </Text>
                      <Image
                        source={{
                          uri: "https://i.ibb.co/SXjvVJkw/Whats-App-Image-2025-11-23-at-22-55-07.jpg",
                        }}
                        className="w-full h-24 md:h-32 rounded-lg"
                      />
                      <Text className="text-blue-200 text-xs mt-1 md:mt-2">
                        Premium boundary wall
                      </Text>
                    </View>
                  </View>

                  <View className="space-y-3 md:space-y-4">
                    <View className="bg-white/5 rounded-lg md:rounded-xl p-3 md:p-4 border border-white/10">
                      <Text className="text-white font-semibold mb-1 md:mb-2 text-sm md:text-base">
                        Water Supply & Pipeline Network
                      </Text>
                      <Image
                        source={{
                          uri: "https://i.ibb.co/7JGCnmw1/Whats-App-Image-2025-11-23-at-22-55-06.jpg",
                        }}
                        className="w-full h-24 md:h-32 rounded-lg"
                      />
                      <Text className="text-blue-200 text-xs mt-1 md:mt-2">
                        Advanced Water Pipeline infrastructure
                      </Text>
                    </View>
                    <View className="bg-white/5 rounded-lg md:rounded-xl p-3 md:p-4 border border-white/10">
                      <Text className="text-white font-semibold mb-1 md:mb-2 text-sm md:text-base">
                        Quiet & Pollution-Free Zone
                      </Text>
                      <Image
                        source={{
                          uri: "https://i.ibb.co/k62nGZ2z/Whats-App-Image-2025-11-23-at-22-55-05-1.jpg",
                        }}
                        className="w-full h-24 md:h-32 rounded-lg"
                      />
                      <Text className="text-blue-200 text-xs mt-1 md:mt-2">
                        Breathe easy. Live peacefully.
                      </Text>
                    </View>
                  </View>
                </View>

                <Text className="text-blue-200 text-center italic text-xs md:text-sm">
                  Continuous development confirms long-term growth potential.
                </Text>
              </View>

              {/* 5. Our Commitment Promise */}
              <View className="bg-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20">
                <View className="flex-row items-center gap-3 mb-4 md:mb-6">
                  <MaterialIcons name="handshake" size={24} color="#8B5CF6" />
                  <Text className="text-white text-xl md:text-2xl font-bold">
                    Our 5 Trust Guarantees
                  </Text>
                </View>

                <View className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 mb-4 md:mb-6">
                  {[
                    {
                      title: "Transparent Pricing",
                      desc: "No hidden charges",
                      icon: "price-check",
                    },
                    {
                      title: "Full Documents",
                      desc: "Complete legal papers",
                      icon: "folder-open",
                    },
                    {
                      title: "Dedicated Manager",
                      desc: "Single point contact",
                      icon: "support-agent",
                    },
                    {
                      title: "Post-Purchase Support",
                      desc: "Lifetime assistance",
                      icon: "headset-mic",
                    },
                    {
                      title: "Legal Verification",
                      desc: "Independent check",
                      icon: "verified",
                    },
                  ].map((guarantee, idx) => (
                    <View
                      key={idx}
                      className="bg-white/5 rounded-lg md:rounded-xl p-3 md:p-4 border border-white/10 items-center text-center"
                    >
                      <View className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/20 rounded-full justify-center items-center mb-2 md:mb-3">
                        <MaterialIcons
                          name={guarantee.icon as any}
                          size={18}
                          color="#8B5CF6"
                        />
                      </View>
                      <Text className="text-white font-semibold text-xs md:text-sm mb-1 text-center">
                        {guarantee.title}
                      </Text>
                      <Text className="text-blue-200 text-xs text-center">
                        {guarantee.desc}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* 6. Live Assistance & Open Communication */}
              <View className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-green-400/30">
                <View className="flex-row items-center gap-3 mb-4 md:mb-6">
                  <MaterialIcons
                    name="support-agent"
                    size={24}
                    color="#34D399"
                  />
                  <Text className="text-white text-xl md:text-2xl font-bold">
                    Live Assistance
                  </Text>
                </View>

                <Text className="text-white text-center text-sm md:text-lg mb-4 md:mb-6 leading-6 md:leading-8">
                  Our property advisors are available for real-time assistance
                  and site clarification.
                </Text>

                <View className="flex-row gap-3 md:gap-4 justify-center flex-wrap">
                  {/* <TouchableOpacity
                    onPress={handleCall}
                    className="bg-blue-600 flex-row items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 rounded-full shadow-lg"
                  >
                    <MaterialIcons name="phone" size={16} color="#fff" />
                    <Text className="text-white font-semibold text-sm md:text-lg">
                      Talk to Advisor
                    </Text>
                  </TouchableOpacity> */}

                  <TouchableOpacity
                    onPress={handleWhatsApp}
                    className="bg-green-500 flex-row items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 rounded-full shadow-lg"
                  >
                    <MaterialCommunityIcons
                      name="whatsapp"
                      size={16}
                      color="#fff"
                    />
                    <Text className="text-white font-semibold text-sm md:text-lg">
                      WhatsApp
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="flex-row justify-center gap-6 md:gap-8 mt-4 md:mt-6">
                  <View className="items-center">
                    <MaterialIcons name="schedule" size={16} color="#34D399" />
                    <Text className="text-white text-xs mt-1">
                      24/7 Support
                    </Text>
                  </View>
                  <View className="items-center">
                    <MaterialIcons name="translate" size={16} color="#34D399" />
                    <Text className="text-white text-xs mt-1">
                      Multi-language
                    </Text>
                  </View>
                  <View className="items-center">
                    <MaterialIcons
                      name="video-call"
                      size={16}
                      color="#34D399"
                    />
                    <Text className="text-white text-xs mt-1">Video Tour</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* 4. INVESTMENT ACTION PLAN */}
        <View className="bg-gradient-to-br from-gray-50 to-white py-12 md:py-20">
          <View style={{ paddingHorizontal: containerPadding }}>
            <Text className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Your 5-Step Path to Wealth Creation
            </Text>
            <Text className="text-gray-600 text-center text-sm md:text-lg mb-8 md:mb-16 max-w-3xl mx-auto leading-6 md:leading-8">
              Follow this proven roadmap used by successful investors to
              maximize returns
            </Text>

            {/* Investment Steps */}
            <View className="max-w-6xl mx-auto space-y-6 md:space-y-8">
              {/* Step 1 */}
              <View className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-xl md:shadow-2xl shadow-blue-500/10 border border-blue-100">
                <View className="flex-row items-start gap-4 md:gap-6">
                  <View className="bg-blue-600 w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl justify-center items-center shadow-lg">
                    <Text className="text-white font-bold text-base md:text-lg">
                      1
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                      Secure Your Plot at Current Prices
                    </Text>
                    <Text className="text-gray-600 leading-6 md:leading-7 text-sm md:text-base mb-3 md:mb-4">
                      Lock in today's rates before the 15% price hike next
                      quarter. Historical data shows early investors gained 45%
                      returns within 2 years.
                    </Text>
                    <View className="bg-blue-50 rounded-lg md:rounded-xl p-3 md:p-4 border border-blue-200">
                      <View className="flex-col md:flex-row justify-between items-center gap-3">
                        <View className="flex-row md:flex-col gap-3">
                          <Text className="text-blue-900 font-semibold text-xs md:text-sm">
                            Current
                          </Text>
                          <Text className="text-green-600 font-bold text-sm md:text-base">
                            ₹2,800/Sq.Yd
                          </Text>
                        </View>
                        <View className="flex-row md:flex-col gap-3">
                          <Text className="text-blue-900 font-semibold text-xs md:text-sm">
                            Next Quarter
                          </Text>
                          <Text className="text-red-600 font-bold text-sm md:text-base">
                            ₹3,220/Sq.Yd
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Step 2 */}
              <View className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-xl md:shadow-2xl shadow-green-500/10 border border-green-100">
                <View className="flex-row items-start gap-4 md:gap-6">
                  <View className="bg-green-600 w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl justify-center items-center shadow-lg">
                    <Text className="text-white font-bold text-base md:text-lg">
                      2
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                      Leverage Infrastructure Development
                    </Text>
                    <Text className="text-gray-600 leading-6 md:leading-7 text-sm md:text-base mb-3 md:mb-4">
                      Capitalize on confirmed government projects. Metro
                      extension and highway development boost land values by
                      25-40%.
                    </Text>
                    <View className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      <View className="bg-green-50 rounded-lg p-3 border border-green-200">
                        <Text className="text-green-900 font-semibold text-xs md:text-sm">
                          441.5 Acres IT Park Expansion (Odisha Govt)
                        </Text>
                        <Text className="text-green-700 text-xs">
                          Starts Q1 2027
                        </Text>
                      </View>
                      <View className="bg-green-50 rounded-lg p-3 border border-green-200">
                        <Text className="text-green-900 font-semibold text-xs md:text-sm">
                          Electronic Manufacturing Units (Public-Private
                          Partnership)
                        </Text>
                        <Text className="text-green-700 text-xs">
                          Starts 2026
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Step 3 */}
              <View className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-xl md:shadow-2xl shadow-purple-500/10 border border-purple-100">
                <View className="flex-row items-start gap-4 md:gap-6">
                  <View className="bg-purple-600 w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl justify-center items-center shadow-lg">
                    <Text className="text-white font-bold text-base md:text-lg">
                      3
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                      Choose Your Wealth Strategy
                    </Text>
                    <Text className="text-gray-600 leading-6 md:leading-7 text-sm md:text-base mb-3 md:mb-4">
                      Select the approach that matches your financial goals.
                    </Text>
                    <View className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                      <View className="bg-purple-50 rounded-lg md:rounded-xl p-3 md:p-4 border border-purple-200">
                        <Text className="text-purple-900 font-bold text-sm mb-1">
                          Quick Flip
                        </Text>
                        <Text className="text-purple-700 text-xs">
                          12-18 months • 25-35%
                        </Text>
                      </View>
                      <View className="bg-purple-50 rounded-lg md:rounded-xl p-3 md:p-4 border border-purple-200">
                        <Text className="text-purple-900 font-bold text-sm mb-1">
                          Rental Income
                        </Text>
                        <Text className="text-purple-700 text-xs">
                          Build & rent • 8-12%
                        </Text>
                      </View>
                      <View className="bg-purple-50 rounded-lg md:rounded-xl p-3 md:p-4 border border-purple-200">
                        <Text className="text-purple-900 font-bold text-sm mb-1">
                          Long-term
                        </Text>
                        <Text className="text-purple-700 text-xs">
                          5+ years • 100%+
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Step 4 */}
              <View className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-xl md:shadow-2xl shadow-orange-500/10 border border-orange-100">
                <View className="flex-row items-start gap-4 md:gap-6">
                  <View className="bg-orange-600 w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl justify-center items-center shadow-lg">
                    <Text className="text-white font-bold text-base md:text-lg">
                      4
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                      Execute with Zero Legal Hassles
                    </Text>
                    <Text className="text-gray-600 leading-6 md:leading-7 text-sm md:text-base mb-3 md:mb-4">
                      Our legal team handles all documentation and registration.
                    </Text>
                    <View className="flex-row flex-wrap gap-2 md:gap-4">
                      {[
                        "RERA Approved",
                        "DTCP Clearance",
                        "Bank Loan Ready",
                        "Title Verified",
                        "Encumbrance Free",
                        "Instant Registration",
                      ].map((item, idx) => (
                        <View
                          key={idx}
                          className="bg-orange-50 px-3 py-1 md:px-4 md:py-2 rounded-full border border-orange-200"
                        >
                          <Text className="text-orange-800 text-xs md:text-sm font-medium">
                            {item}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </View>

              {/* Step 5 */}
              <View className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-xl md:shadow-2xl shadow-red-500/10 border border-red-100">
                <View className="flex-row items-start gap-4 md:gap-6">
                  <View className="bg-red-600 w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl justify-center items-center shadow-lg">
                    <Text className="text-white font-bold text-base md:text-lg">
                      5
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                      Monitor & Maximize Returns
                    </Text>
                    <Text className="text-gray-600 leading-6 md:leading-7 text-sm md:text-base mb-3 md:mb-4">
                      Receive updates and expert advice to maximize your
                      investment.
                    </Text>
                    <View className="bg-red-50 rounded-lg md:rounded-xl p-3 md:p-4 border border-red-200">
                      <View className="flex-col md:flex-row justify-between items-center gap-3">
                        <View className="items-center">
                          <Text className="text-red-900 font-bold text-base md:text-lg">
                            15-25%
                          </Text>
                          <Text className="text-red-700 text-xs">Year 1</Text>
                        </View>
                        <View className="items-center">
                          <Text className="text-red-900 font-bold text-base md:text-lg">
                            35-50%
                          </Text>
                          <Text className="text-red-700 text-xs">Year 2</Text>
                        </View>
                        <View className="items-center">
                          <Text className="text-red-900 font-bold text-base md:text-lg">
                            80-120%
                          </Text>
                          <Text className="text-red-700 text-xs">Year 5</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Success Proof Section */}
            <View className="mt-12 md:mt-16 bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl md:rounded-2xl p-6 md:p-8 shadow-2xl">
              <Text className="text-2xl md:text-3xl font-bold text-center text-white mb-6 md:mb-8">
                Real Investor Success
              </Text>
              <View className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <View className="bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl p-4 md:p-6 border border-white/20">
                  <Text className="text-white text-base md:text-lg font-bold mb-1 md:mb-2">
                    Mr. Sharma
                  </Text>
                  <Text className="text-blue-200 text-xs md:text-sm mb-2 md:mb-3">
                    Invested: ₹85 Lakhs
                  </Text>
                  <Text className="text-green-300 text-lg md:text-xl font-bold">
                    ₹1.2 Cr
                  </Text>
                  <Text className="text-white text-xs">
                    Current Value (18 months)
                  </Text>
                </View>
                <View className="bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl p-4 md:p-6 border border-white/20">
                  <Text className="text-white text-base md:text-lg font-bold mb-1 md:mb-2">
                    Patel Family
                  </Text>
                  <Text className="text-blue-200 text-xs md:text-sm mb-2 md:mb-3">
                    Invested: ₹65 Lakhs
                  </Text>
                  <Text className="text-green-300 text-lg md:text-xl font-bold">
                    ₹92 Lakhs
                  </Text>
                  <Text className="text-white text-xs">
                    Current Value (12 months)
                  </Text>
                </View>
                <View className="bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl p-4 md:p-6 border border-white/20">
                  <Text className="text-white text-base md:text-lg font-bold mb-1 md:mb-2">
                    NRI Investor
                  </Text>
                  <Text className="text-blue-200 text-xs md:text-sm mb-2 md:mb-3">
                    Invested: ₹1.2 Cr
                  </Text>
                  <Text className="text-green-300 text-lg md:text-xl font-bold">
                    ₹1.8 Cr
                  </Text>
                  <Text className="text-white text-xs">
                    Current Value (24 months)
                  </Text>
                </View>
              </View>
            </View>

            {/* Final CTA */}
            <View className="mt-8 md:mt-12 text-center">
              {/* <Text className="text-gray-700 text-sm md:text-lg mb-4 md:mb-6">
                Ready to start your investment journey?
              </Text> */}
              {/* <View className="flex-row gap-3 md:gap-4 justify-center flex-wrap">
                <TouchableOpacity
                  onPress={() => setShowSiteVisitModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 md:px-8 py-3 md:py-4 rounded-full shadow-2xl"
                >
                  <Text className="text-white font-semibold text-sm md:text-lg">
                    Start with Step 1
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="border border-gray-300 px-4 md:px-6 py-3 md:py-4 rounded-full">
                  <Text className="text-gray-700 font-semibold text-sm md:text-lg">
                    Download Guide
                  </Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
        </View>

        {/* FOOTER WITH AUTHORITY */}
        <View className="bg-gray-900 px-6 py-12 md:py-16">
          <View style={{ paddingHorizontal: containerPadding }}>
            <View className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
              <View>
                <View className="flex-row items-baseline">
                  <Text className="text-white font-bold text-lg md:text-xl uppercase">
                    TWISTLEN
                  </Text>
                  <Text className="text-blue-400 text-[10px] md:text-xs ml-2">
                    An Orbitaven Venture
                  </Text>
                </View>
                <Text className="text-gray-400 leading-5 md:leading-6 text-sm md:text-base mb-3 md:mb-4">
                  Premium plotted development offering luxury living spaces with
                  exceptional investment returns.
                </Text>
                <View className="flex-row gap-1 md:gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <MaterialIcons
                      key={star}
                      name="star"
                      size={14}
                      color="#F59E0B"
                    />
                  ))}
                  <Text className="text-white text-xs md:text-sm ml-1 md:ml-2">
                    4.9/5 (128 Reviews)
                  </Text>
                </View>
              </View>

              <View>
                <Text className="text-white font-semibold mb-3 md:mb-4 text-base md:text-lg">
                  Office Address
                </Text>
                <View className="space-y-1 md:space-y-2">
                  <Text className="text-gray-400 text-sm md:text-base leading-5 md:leading-6">
                    Khordha{"\n"}
                    PIN 752056 {"\n"}
                    Odisha, India
                  </Text>
                </View>
              </View>

              <View>
                <Text className="text-white font-semibold mb-3 md:mb-4 text-base md:text-lg">
                  Contact
                </Text>
                <View className="space-y-2 md:space-y-3">
                  <Text className="text-gray-400 text-sm md:text-base">
                    +91-9337802797
                  </Text>
                  <Text className="text-gray-400 text-sm md:text-base">
                    orbitaven34@gmail.com
                  </Text>
                  <Text className="text-green-400 font-semibold text-sm md:text-base">
                    RERA No: P12300000001
                  </Text>
                </View>
              </View>

              <View>
                <Text className="text-white font-semibold mb-3 md:mb-4 text-base md:text-lg">
                  Certifications
                </Text>
                <View className="space-y-1 md:space-y-2">
                  <Text className="text-gray-400 text-sm md:text-base">
                    Best Developer 2023
                  </Text>
                  <Text className="text-gray-400 text-sm md:text-base">
                    ISO 9001 Certified
                  </Text>
                  <Text className="text-gray-400 text-sm md:text-base">
                    CRISIL Rated
                  </Text>
                  <Text className="text-gray-400 text-sm md:text-base">
                    DTCP Approved
                  </Text>
                </View>
              </View>
            </View>

            <View className="border-t border-gray-800 pt-6 md:pt-8">
              <Text className="text-gray-500 text-center text-xs md:text-sm">
                © 2025 Twistlen All rights reserved. | Privacy Policy | Terms &
                Conditions
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RealEstateLanding;
