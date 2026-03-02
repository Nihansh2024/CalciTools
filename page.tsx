'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calculator, Heart, DollarSign, Calendar, Wrench,
  X, Check, PieChart as PieChartIcon, TrendingUp, Clock,
  Ruler, Weight, Activity, Brain,
  Sparkles, Search, Menu, ArrowRight, Percent,
  Zap, Target, Award, BarChart3, Hash, Square,
  Timer, Globe, FileText, Shield, Moon, Sun, Droplets, Wind,
  Home, Car, CreditCard, PiggyBank, Landmark, Wallet, Receipt,
  TrendingDown, Coins, ChevronRight, Star, Info, AlertCircle, Divide
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'

// Custom Icons
const FlameIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
)

const ThermometerIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>
  </svg>
)

const PaletteIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/>
  </svg>
)

const HardDriveIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="12" x2="2" y2="12"/>
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
  </svg>
)

// 3D Pie Chart
const PieChart3D = ({ data, size = 180 }: { data: { label: string; value: number; color: string }[]; size?: number }) => {
  const total = data.reduce((sum, item) => sum + Math.max(item.value, 0.1), 0)
  const centerX = size / 2
  const centerY = size / 2
  const radius = size / 2 - 20
  
  const segments = data.reduce<{ startAngle: number; endAngle: number; color: string; label: string; value: number; percentage: number }[]>((acc, item, index) => {
    const prevEnd = index === 0 ? -90 : acc[index - 1].endAngle
    const angle = (Math.max(item.value, 0.1) / total) * 360
    const percentage = (Math.max(item.value, 0.1) / total) * 100
    acc.push({ startAngle: prevEnd, endAngle: prevEnd + angle, color: item.color, label: item.label, value: item.value, percentage })
    return acc
  }, [])

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="absolute top-1 left-1 opacity-20 blur-sm">
          {segments.map((segment, index) => {
            const startRad = (segment.startAngle * Math.PI) / 180
            const endRad = (segment.endAngle * Math.PI) / 180
            const x1 = centerX + radius * Math.cos(startRad)
            const y1 = centerY + radius * Math.sin(startRad)
            const x2 = centerX + radius * Math.cos(endRad)
            const y2 = centerY + radius * Math.sin(endRad)
            const largeArc = (segment.endAngle - segment.startAngle) > 180 ? 1 : 0
            return <path key={index} d={`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`} fill={segment.color} />
          })}
        </svg>
        <svg width={size} height={size} className="relative z-10 drop-shadow-lg">
          <defs><filter id="glow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
          {segments.map((segment, index) => {
            const startRad = (segment.startAngle * Math.PI) / 180
            const endRad = (segment.endAngle * Math.PI) / 180
            const midRad = ((segment.startAngle + segment.endAngle) / 2 * Math.PI) / 180
            const x1 = centerX + radius * Math.cos(startRad)
            const y1 = centerY + radius * Math.sin(startRad)
            const x2 = centerX + radius * Math.cos(endRad)
            const y2 = centerY + radius * Math.sin(endRad)
            const labelRadius = radius * 0.65
            const labelX = centerX + labelRadius * Math.cos(midRad)
            const labelY = centerY + labelRadius * Math.sin(midRad)
            const largeArc = (segment.endAngle - segment.startAngle) > 180 ? 1 : 0
            const angle = segment.endAngle - segment.startAngle
            return (
              <g key={index}>
                <path d={`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`} fill={segment.color} stroke="white" strokeWidth="2" filter="url(#glow)" />
                {angle > 25 && <text x={labelX} y={labelY} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="11" fontWeight="bold">{segment.percentage.toFixed(0)}%</text>}
              </g>
            )
          })}
        </svg>
      </div>
      <div className="grid grid-cols-2 gap-2 w-full">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.value.toFixed(1)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Comparison Bar
const ComparisonBar = ({ label, value, max, color, unit }: { label: string; value: number; max: number; color: string; unit?: string }) => {
  const percentage = Math.min((value / max) * 100, 100)
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{value.toFixed(1)}{unit}</span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 0.8 }} className="h-full rounded-full" style={{ backgroundColor: color }} />
      </div>
    </div>
  )
}

// Result Display
const ResultDisplay = ({ label, value, unit, highlight, description, icon: Icon }: { label: string; value: string | number; unit?: string; highlight?: boolean; description?: string; icon?: React.ElementType }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-xl ${highlight ? 'bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary shadow-lg' : 'bg-muted/50 border'}`}>
    <div className="flex items-center gap-2 mb-1">
      {Icon && <Icon className={`h-4 w-4 ${highlight ? 'text-primary' : 'text-muted-foreground'}`} />}
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
    <p className={`text-2xl font-bold ${highlight ? 'text-primary' : ''}`}>
      {value} {unit && <span className="text-sm font-normal text-muted-foreground">{unit}</span>}
    </p>
    {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
  </motion.div>
)

// Formula Display
const FormulaDisplay = ({ formula, explanation, steps }: { formula: string; explanation: string; steps?: string[] }) => (
  <div className="bg-gradient-to-br from-muted to-muted/50 p-4 rounded-xl border shadow-inner">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
        <Hash className="h-3 w-3 text-primary" />
      </div>
      <p className="text-xs font-semibold text-muted-foreground">Formula Used</p>
    </div>
    <code className="text-sm font-mono block bg-background/80 px-3 py-2 rounded-lg border mb-3">{formula}</code>
    <p className="text-sm text-muted-foreground mb-3">{explanation}</p>
    {steps && steps.length > 0 && (
      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground">Step-by-step:</p>
        <ol className="list-decimal list-inside space-y-1">
          {steps.map((step, i) => <li key={i} className="text-xs text-muted-foreground">{step}</li>)}
        </ol>
      </div>
    )}
  </div>
)

// Info Card
const InfoCard = ({ title, content, variant = 'info' }: { title: string; content: string; variant?: 'info' | 'warning' | 'success' }) => {
  const variants = {
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300',
    warning: 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300',
    success: 'bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-300'
  }
  const icons = { info: Info, warning: AlertCircle, success: Check }
  const Icon = icons[variant]
  return (
    <div className={`p-3 rounded-lg border ${variants[variant]} flex gap-2`}>
      <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-xs font-semibold">{title}</p>
        <p className="text-xs opacity-80">{content}</p>
      </div>
    </div>
  )
}

// Calculator Config Type
interface CalculatorConfig {
  name: string
  description: string
  longDescription: string
  category: string
  icon: React.ElementType
  inputs: { id: string; label: string; placeholder: string; type?: string; options?: { value: string; label: string }[] }[]
  calculate: (inputs: Record<string, string>) => {
    results: { label: string; value: string | number; unit?: string; highlight?: boolean; description?: string; icon?: React.ElementType }[]
    pieData?: { label: string; value: number; color: string }[]
    formula?: { formula: string; explanation: string; steps?: string[] }
    comparisons?: { label: string; value: number; max: number; color: string; unit?: string }[]
    infoCards?: { title: string; content: string; variant: 'info' | 'warning' | 'success' }[]
  }
}

// All Calculator Configurations - Consolidated in one place
const allCalculatorConfigs: Record<string, CalculatorConfig> = {
  // HEALTH CALCULATORS (31 total)
  bmi: {
    name: 'BMI Calculator', description: 'Calculate your Body Mass Index', longDescription: 'Body Mass Index (BMI) is a widely used metric to assess whether a person has a healthy body weight relative to their height. It provides a simple numeric measure that helps categorize individuals into underweight, normal weight, overweight, or obese categories. BMI is calculated by dividing weight in kilograms by height in meters squared.', category: 'health', icon: Activity,
    inputs: [
      { id: 'unit', label: 'Unit System', placeholder: '', type: 'select', options: [{ value: 'metric', label: 'Metric (kg, cm)' }, { value: 'imperial', label: 'Imperial (lbs, in)' }] },
      { id: 'weight', label: 'Weight', placeholder: '70' },
      { id: 'height', label: 'Height', placeholder: '175' }
    ],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), h = parseFloat(inputs.height), unit = inputs.unit || 'metric'
      if (!w || !h) return { results: [] }
      let bmi: number, heightM: number
      if (unit === 'metric') { heightM = h / 100; bmi = w / Math.pow(heightM, 2) }
      else { heightM = h * 0.0254; bmi = (w / Math.pow(h, 2)) * 703 }
      let category: string, color: string, risk: string
      if (bmi < 18.5) { category = 'Underweight'; color = '#3b82f6'; risk = 'Risk of nutritional deficiency' }
      else if (bmi < 25) { category = 'Normal Weight'; color = '#22c55e'; risk = 'Low health risk' }
      else if (bmi < 30) { category = 'Overweight'; color = '#f59e0b'; risk = 'Moderate risk of heart disease' }
      else { category = 'Obese'; color = '#ef4444'; risk = 'High risk of heart disease' }
      const healthyMin = 18.5 * Math.pow(heightM, 2), healthyMax = 24.9 * Math.pow(heightM, 2)
      return {
        results: [
          { label: 'Your BMI', value: bmi.toFixed(1), highlight: true, icon: Activity },
          { label: 'Category', value: category, icon: Target },
          { label: 'Healthy Weight Range', value: `${healthyMin.toFixed(1)} - ${healthyMax.toFixed(1)} kg` }
        ],
        pieData: [{ label: 'BMI', value: bmi, color }, { label: 'Normal Range', value: 25 - bmi, color: '#e5e7eb' }],
        formula: { formula: 'BMI = Weight (kg) ÷ Height² (m)', explanation: `Calculated: ${w} ÷ ${heightM.toFixed(2)}² = ${bmi.toFixed(1)}`, steps: [`Height: ${h} = ${heightM.toFixed(2)} m`, `Square: ${heightM.toFixed(2)}² = ${Math.pow(heightM, 2).toFixed(2)}`, `BMI: ${w} ÷ ${Math.pow(heightM, 2).toFixed(2)} = ${bmi.toFixed(1)}`] },
        comparisons: [{ label: 'Your BMI', value: bmi, max: 40, color }, { label: 'Normal (18.5-25)', value: Math.min(25, Math.max(18.5, bmi)), max: 40, color: '#22c55e' }],
        infoCards: [{ title: 'Health Implications', content: risk, variant: bmi < 18.5 || bmi >= 30 ? 'warning' : 'info' }, { title: 'BMI Limitations', content: 'BMI does not distinguish between muscle and fat mass.', variant: 'info' }]
      }
    }
  },
  'body-fat': {
    name: 'Body Fat Calculator', description: 'Estimate body fat percentage', longDescription: 'The Body Fat Calculator uses the US Navy method to estimate your body fat percentage based on circumference measurements. This method is widely used by military and fitness professionals.', category: 'health', icon: Percent,
    inputs: [
      { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
      { id: 'height', label: 'Height (cm)', placeholder: '175' },
      { id: 'neck', label: 'Neck (cm)', placeholder: '38' },
      { id: 'waist', label: 'Waist (cm)', placeholder: '85' },
      { id: 'hip', label: 'Hip (cm) - Female only', placeholder: '95' }
    ],
    calculate: (inputs) => {
      const h = parseFloat(inputs.height), n = parseFloat(inputs.neck), w = parseFloat(inputs.waist), hp = parseFloat(inputs.hip), gender = inputs.gender || 'male'
      if (!h || !n || !w) return { results: [] }
      let bodyFat: number
      if (gender === 'male') bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450
      else { if (!hp) return { results: [{ label: 'Error', value: 'Hip required' }] }; bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.22100 * Math.log10(h)) - 450 }
      bodyFat = Math.max(3, Math.min(50, bodyFat))
      return {
        results: [{ label: 'Body Fat %', value: bodyFat.toFixed(1), unit: '%', highlight: true }, { label: 'Lean Mass', value: (100 - bodyFat).toFixed(1), unit: '%' }],
        pieData: [{ label: 'Body Fat', value: bodyFat, color: '#ef4444' }, { label: 'Lean Mass', value: 100 - bodyFat, color: '#22c55e' }],
        formula: { formula: 'US Navy Method', explanation: 'Uses body measurements to estimate body fat percentage.' }
      }
    }
  },
  calorie: {
    name: 'Calorie Calculator', description: 'Daily calorie needs', longDescription: 'Calculate your daily caloric needs based on your Basal Metabolic Rate (BMR) and activity level. This is essential for weight management goals.', category: 'health', icon: FlameIcon,
    inputs: [
      { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
      { id: 'age', label: 'Age', placeholder: '25' },
      { id: 'weight', label: 'Weight (kg)', placeholder: '70' },
      { id: 'height', label: 'Height (cm)', placeholder: '175' },
      { id: 'activity', label: 'Activity', placeholder: '', type: 'select', options: [{ value: '1.2', label: 'Sedentary' }, { value: '1.375', label: 'Light' }, { value: '1.55', label: 'Moderate' }, { value: '1.725', label: 'Active' }, { value: '1.9', label: 'Very Active' }] }
    ],
    calculate: (inputs) => {
      const age = parseFloat(inputs.age), weight = parseFloat(inputs.weight), height = parseFloat(inputs.height), activity = parseFloat(inputs.activity || '1.55'), gender = inputs.gender || 'male'
      if (!age || !weight || !height) return { results: [] }
      let bmr = gender === 'male' ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age) : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
      const tdee = bmr * activity
      return {
        results: [{ label: 'BMR', value: Math.round(bmr), unit: 'cal/day', icon: Zap }, { label: 'Maintenance', value: Math.round(tdee), unit: 'cal/day', highlight: true }, { label: 'Weight Loss', value: Math.round(tdee - 500), unit: 'cal/day' }],
        pieData: [{ label: 'BMR', value: bmr, color: '#8b5cf6' }, { label: 'Activity', value: tdee - bmr, color: '#22c55e' }],
        formula: { formula: 'TDEE = BMR × Activity', explanation: 'Using Mifflin-St Jeor equation.' }
      }
    }
  },
  tdee: {
    name: 'TDEE Calculator', description: 'Total energy expenditure', longDescription: 'TDEE represents the total number of calories you burn daily.', category: 'health', icon: FlameIcon,
    inputs: [
      { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
      { id: 'age', label: 'Age', placeholder: '25' },
      { id: 'weight', label: 'Weight (kg)', placeholder: '70' },
      { id: 'height', label: 'Height (cm)', placeholder: '175' },
      { id: 'activity', label: 'Activity', placeholder: '', type: 'select', options: [{ value: '1.2', label: 'Sedentary' }, { value: '1.55', label: 'Moderate' }, { value: '1.9', label: 'Very Active' }] }
    ],
    calculate: (inputs) => {
      const age = parseFloat(inputs.age), weight = parseFloat(inputs.weight), height = parseFloat(inputs.height), activity = parseFloat(inputs.activity || '1.55'), gender = inputs.gender || 'male'
      if (!age || !weight || !height) return { results: [] }
      let bmr = gender === 'male' ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age) : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
      const tdee = bmr * activity
      return { results: [{ label: 'BMR', value: Math.round(bmr), unit: 'cal' }, { label: 'TDEE', value: Math.round(tdee), unit: 'cal/day', highlight: true }], pieData: [{ label: 'BMR', value: bmr, color: '#3b82f6' }, { label: 'Activity', value: tdee - bmr, color: '#22c55e' }], formula: { formula: 'TDEE = BMR × Activity', explanation: `TDEE: ${Math.round(tdee)} calories/day` } }
    }
  },
  bmr: {
    name: 'BMR Calculator', description: 'Basal metabolic rate', longDescription: 'BMR is calories needed at complete rest.', category: 'health', icon: Zap,
    inputs: [
      { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
      { id: 'age', label: 'Age', placeholder: '25' },
      { id: 'weight', label: 'Weight (kg)', placeholder: '70' },
      { id: 'height', label: 'Height (cm)', placeholder: '175' }
    ],
    calculate: (inputs) => {
      const age = parseFloat(inputs.age), weight = parseFloat(inputs.weight), height = parseFloat(inputs.height), gender = inputs.gender || 'male'
      if (!age || !weight || !height) return { results: [] }
      let bmr = gender === 'male' ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age) : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
      return { results: [{ label: 'BMR', value: Math.round(bmr), unit: 'cal/day', highlight: true, icon: Zap }], formula: { formula: 'Mifflin-St Jeor Equation', explanation: 'Your BMR represents minimum calories needed at rest.' } }
    }
  },
  // FINANCIAL CALCULATORS
  'compound-interest': {
    name: 'Compound Interest Calculator', description: 'Investment growth', longDescription: 'Calculate how your investments grow over time with compound interest - the eighth wonder of the world.', category: 'financial', icon: TrendingUp,
    inputs: [
      { id: 'principal', label: 'Principal ($)', placeholder: '10000' },
      { id: 'rate', label: 'Annual Rate (%)', placeholder: '7' },
      { id: 'time', label: 'Years', placeholder: '10' },
      { id: 'frequency', label: 'Frequency', placeholder: '', type: 'select', options: [{ value: '1', label: 'Annually' }, { value: '12', label: 'Monthly' }, { value: '365', label: 'Daily' }] }
    ],
    calculate: (inputs) => {
      const p = parseFloat(inputs.principal), r = parseFloat(inputs.rate) / 100, t = parseFloat(inputs.time), n = parseFloat(inputs.frequency || '12')
      if (!p || !r || !t) return { results: [] }
      const amount = p * Math.pow(1 + r / n, n * t), interest = amount - p
      return {
        results: [{ label: 'Final Amount', value: `$${amount.toLocaleString(undefined, {maximumFractionDigits: 2})}`, highlight: true }, { label: 'Interest Earned', value: `$${interest.toLocaleString(undefined, {maximumFractionDigits: 2})}` }],
        pieData: [{ label: 'Principal', value: p, color: '#3b82f6' }, { label: 'Interest', value: interest, color: '#22c55e' }],
        formula: { formula: 'A = P(1 + r/n)^(nt)', explanation: `${inputs.rate}% compounded ${n === 1 ? 'annually' : n === 12 ? 'monthly' : 'daily'} for ${t} years.` }
      }
    }
  },
  mortgage: {
    name: 'Mortgage Calculator', description: 'Monthly mortgage payments', longDescription: 'Calculate monthly mortgage payments.', category: 'financial', icon: Home,
    inputs: [
      { id: 'price', label: 'Home Price ($)', placeholder: '350000' },
      { id: 'down', label: 'Down Payment ($)', placeholder: '70000' },
      { id: 'rate', label: 'Interest Rate (%)', placeholder: '6.5' },
      { id: 'term', label: 'Term', placeholder: '', type: 'select', options: [{ value: '15', label: '15 years' }, { value: '30', label: '30 years' }] }
    ],
    calculate: (inputs) => {
      const price = parseFloat(inputs.price), down = parseFloat(inputs.down) || 0, rate = parseFloat(inputs.rate) / 100 / 12, term = parseFloat(inputs.term || '30') * 12, loan = price - down
      if (!loan || !rate || !term) return { results: [] }
      const monthly = loan * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1), total = monthly * term, interest = total - loan
      return {
        results: [{ label: 'Monthly Payment', value: `$${Math.round(monthly).toLocaleString()}`, highlight: true }, { label: 'Total Interest', value: `$${Math.round(interest).toLocaleString()}` }],
        pieData: [{ label: 'Principal', value: loan, color: '#3b82f6' }, { label: 'Interest', value: interest, color: '#ef4444' }],
        formula: { formula: 'M = P × [r(1+r)^n] / [(1+r)^n - 1]', explanation: `Loan: $${loan.toLocaleString()}, Rate: ${(rate*100).toFixed(3)}%/month` }
      }
    }
  },
  loan: {
    name: 'Loan Calculator', description: 'Loan payments', longDescription: 'Calculate loan payments and total interest.', category: 'financial', icon: CreditCard,
    inputs: [{ id: 'amount', label: 'Loan Amount ($)', placeholder: '25000' }, { id: 'rate', label: 'Interest Rate (%)', placeholder: '5' }, { id: 'term', label: 'Term (years)', placeholder: '5' }],
    calculate: (inputs) => {
      const amount = parseFloat(inputs.amount), rate = parseFloat(inputs.rate) / 100 / 12, term = parseFloat(inputs.term) * 12
      if (!amount || !rate || !term) return { results: [] }
      const monthly = amount * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1), total = monthly * term, interest = total - amount
      return { results: [{ label: 'Monthly Payment', value: `$${Math.round(monthly).toLocaleString()}`, highlight: true }, { label: 'Total Interest', value: `$${Math.round(interest).toLocaleString()}` }], pieData: [{ label: 'Principal', value: amount, color: '#3b82f6' }, { label: 'Interest', value: interest, color: '#ef4444' }], formula: { formula: 'Standard amortization formula', explanation: 'Calculates fixed monthly payments.' } }
    }
  },
  tip: {
    name: 'Tip Calculator', description: 'Calculate tips', longDescription: 'Calculate tips and split bills.', category: 'financial', icon: Receipt,
    inputs: [
      { id: 'bill', label: 'Bill Amount ($)', placeholder: '85' },
      { id: 'tip', label: 'Tip %', placeholder: '', type: 'select', options: [{ value: '15', label: '15%' }, { value: '18', label: '18%' }, { value: '20', label: '20%' }] },
      { id: 'split', label: 'Split', placeholder: '', type: 'select', options: [{ value: '1', label: '1 person' }, { value: '2', label: '2 people' }, { value: '4', label: '4 people' }] }
    ],
    calculate: (inputs) => {
      const bill = parseFloat(inputs.bill), tip = parseFloat(inputs.tip || '18'), split = parseFloat(inputs.split || '1')
      if (!bill) return { results: [] }
      const tipAmount = bill * tip / 100, total = bill + tipAmount, perPerson = total / split
      return { results: [{ label: 'Tip', value: `$${tipAmount.toFixed(2)}` }, { label: 'Total', value: `$${total.toFixed(2)}`, highlight: true }, ...(split > 1 ? [{ label: 'Per Person', value: `$${perPerson.toFixed(2)}` }] : [])], pieData: [{ label: 'Bill', value: bill, color: '#3b82f6' }, { label: 'Tip', value: tipAmount, color: '#22c55e' }], formula: { formula: 'Tip = Bill × Tip%', explanation: `${tip}% tip on $${bill}` } }
    }
  },
  discount: {
    name: 'Discount Calculator', description: 'Calculate discounts', longDescription: 'Calculate discounted prices.', category: 'financial', icon: Percent,
    inputs: [{ id: 'price', label: 'Original Price ($)', placeholder: '100' }, { id: 'discount', label: 'Discount %', placeholder: '20' }],
    calculate: (inputs) => {
      const price = parseFloat(inputs.price), discount = parseFloat(inputs.discount)
      if (!price) return { results: [] }
      const savings = price * discount / 100, final = price - savings
      return { results: [{ label: 'You Save', value: `$${savings.toFixed(2)}` }, { label: 'Final Price', value: `$${final.toFixed(2)}`, highlight: true }], pieData: [{ label: 'Final', value: final, color: '#22c55e' }, { label: 'Saved', value: savings, color: '#ef4444' }], formula: { formula: 'Final = Price × (1 - Discount%)', explanation: `${discount}% off $${price}` } }
    }
  },
  investment: {
    name: 'Investment Calculator', description: 'Investment returns', longDescription: 'Calculate future investment value.', category: 'financial', icon: TrendingUp,
    inputs: [{ id: 'principal', label: 'Investment ($)', placeholder: '10000' }, { id: 'rate', label: 'Annual Return (%)', placeholder: '8' }, { id: 'years', label: 'Years', placeholder: '10' }],
    calculate: (inputs) => {
      const p = parseFloat(inputs.principal), r = parseFloat(inputs.rate) / 100, n = parseFloat(inputs.years)
      if (!p || !r || !n) return { results: [] }
      const future = p * Math.pow(1 + r, n), returns = future - p
      return { results: [{ label: 'Future Value', value: `$${Math.round(future).toLocaleString()}`, highlight: true }, { label: 'Returns', value: `$${Math.round(returns).toLocaleString()}` }], pieData: [{ label: 'Principal', value: p, color: '#3b82f6' }, { label: 'Returns', value: returns, color: '#22c55e' }], formula: { formula: 'FV = PV × (1 + r)^n', explanation: `${inputs.rate}% annual return for ${n} years.` } }
    }
  },
  savings: {
    name: 'Savings Calculator', description: 'Savings growth', longDescription: 'Calculate savings growth with contributions.', category: 'financial', icon: PiggyBank,
    inputs: [{ id: 'initial', label: 'Initial ($)', placeholder: '1000' }, { id: 'monthly', label: 'Monthly ($)', placeholder: '500' }, { id: 'rate', label: 'Rate (%)', placeholder: '5' }, { id: 'years', label: 'Years', placeholder: '10' }],
    calculate: (inputs) => {
      const initial = parseFloat(inputs.initial) || 0, monthly = parseFloat(inputs.monthly) || 0, rate = parseFloat(inputs.rate) / 100 / 12, years = parseFloat(inputs.years), n = years * 12
      if (n === 0) return { results: [] }
      const fvInitial = initial * Math.pow(1 + rate, n), fvMonthly = rate > 0 ? monthly * ((Math.pow(1 + rate, n) - 1) / rate) : monthly * n, total = fvInitial + fvMonthly, contributions = initial + monthly * n, interest = total - contributions
      return { results: [{ label: 'Total Savings', value: `$${Math.round(total).toLocaleString()}`, highlight: true }, { label: 'Interest Earned', value: `$${Math.round(interest).toLocaleString()}` }], pieData: [{ label: 'Contributions', value: contributions, color: '#3b82f6' }, { label: 'Interest', value: interest, color: '#22c55e' }], formula: { formula: 'FV = P(1+r)^n + PMT × [(1+r)^n - 1]/r', explanation: 'Compound growth with regular contributions.' } }
    }
  },
  // MATH CALCULATORS
  percentage: {
    name: 'Percentage Calculator', description: 'Calculate percentages', longDescription: 'Calculate percentages in various ways.', category: 'math', icon: Percent,
    inputs: [
      { id: 'mode', label: 'Type', placeholder: '', type: 'select', options: [{ value: 'what-is', label: 'What is X% of Y?' }, { value: 'is-what', label: 'X is what % of Y?' }, { value: 'increase', label: 'X + Y%' }, { value: 'decrease', label: 'X - Y%' }] },
      { id: 'value1', label: 'First Value', placeholder: '50' },
      { id: 'value2', label: 'Second Value', placeholder: '200' }
    ],
    calculate: (inputs) => {
      const v1 = parseFloat(inputs.value1), v2 = parseFloat(inputs.value2)
      if (isNaN(v1) || isNaN(v2)) return { results: [] }
      let result: string, explanation: string
      switch (inputs.mode) {
        case 'what-is': result = `${(v1 / 100 * v2).toFixed(2)}`; explanation = `${v1}% of ${v2} = ${result}`; break
        case 'is-what': result = `${(v1 / v2 * 100).toFixed(2)}%`; explanation = `${v1} is ${result} of ${v2}`; break
        case 'increase': result = `${(v1 * (1 + v2 / 100)).toFixed(2)}`; explanation = `${v1} + ${v2}% = ${result}`; break
        case 'decrease': result = `${(v1 * (1 - v2 / 100)).toFixed(2)}`; explanation = `${v1} - ${v2}% = ${result}`; break
        default: result = ''; explanation = ''
      }
      return { results: [{ label: 'Result', value: result, highlight: true }], formula: { formula: inputs.mode === 'what-is' ? 'Result = X% × Y' : inputs.mode === 'is-what' ? 'Result = (X/Y) × 100%' : inputs.mode === 'increase' ? 'Result = X × (1 + Y%)' : 'Result = X × (1 - Y%)', explanation } }
    }
  },
  scientific: {
    name: 'Scientific Calculator', description: 'Advanced math', longDescription: 'Perform advanced mathematical calculations.', category: 'math', icon: Calculator,
    inputs: [{ id: 'expression', label: 'Expression', placeholder: '2+2*3, sin(30), sqrt(16)' }],
    calculate: (inputs) => {
      try {
        const expr = inputs.expression.replace(/sin/g, 'Math.sin').replace(/cos/g, 'Math.cos').replace(/tan/g, 'Math.tan').replace(/sqrt/g, 'Math.sqrt').replace(/\^/g, '**').replace(/pi/g, 'Math.PI')
        const result = new Function(`return ${expr}`)()
        return { results: [{ label: 'Result', value: result.toString(), highlight: true }], formula: { formula: inputs.expression, explanation: `Evaluated: ${result}` } }
      } catch { return { results: [{ label: 'Error', value: 'Invalid expression' }] } }
    }
  },
  'square-root': {
    name: 'Square Root', description: 'Calculate √x', longDescription: 'Calculate square root of any non-negative number.', category: 'math', icon: Square,
    inputs: [{ id: 'value', label: 'Number', placeholder: '144' }],
    calculate: (inputs) => {
      const v = parseFloat(inputs.value)
      if (isNaN(v) || v < 0) return { results: [{ label: 'Error', value: 'Enter non-negative number' }] }
      return { results: [{ label: 'Square Root', value: Math.sqrt(v).toFixed(6), highlight: true }], formula: { formula: '√x', explanation: `√${v} = ${Math.sqrt(v).toFixed(6)}` } }
    }
  },
  gcd: {
    name: 'GCD Calculator', description: 'Greatest Common Divisor', longDescription: 'Find GCD of two or more numbers.', category: 'math', icon: Hash,
    inputs: [{ id: 'numbers', label: 'Numbers (comma-separated)', placeholder: '12, 24, 36' }],
    calculate: (inputs) => {
      const nums = inputs.numbers.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n > 0)
      if (nums.length < 2) return { results: [{ label: 'Error', value: 'Enter 2+ positive numbers' }] }
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b)
      let result = nums[0]
      for (let i = 1; i < nums.length; i++) result = gcd(result, nums[i])
      return { results: [{ label: 'GCD', value: result, highlight: true }], formula: { formula: 'Euclidean Algorithm', explanation: `GCD of ${nums.join(', ')} is ${result}` } }
    }
  },
  average: {
    name: 'Average Calculator', description: 'Mean, median, mode', longDescription: 'Calculate statistical measures.', category: 'math', icon: BarChart3,
    inputs: [{ id: 'numbers', label: 'Numbers (comma-separated)', placeholder: '5, 10, 15, 20, 25' }],
    calculate: (inputs) => {
      const nums = inputs.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n))
      if (nums.length === 0) return { results: [] }
      const mean = nums.reduce((a, b) => a + b, 0) / nums.length
      const sorted = [...nums].sort((a, b) => a - b)
      const median = nums.length % 2 === 0 ? (sorted[nums.length/2 - 1] + sorted[nums.length/2]) / 2 : sorted[Math.floor(nums.length/2)]
      const range = sorted[sorted.length - 1] - sorted[0]
      return { results: [{ label: 'Mean', value: mean.toFixed(2), highlight: true }, { label: 'Median', value: median.toFixed(2) }, { label: 'Range', value: range.toFixed(2) }], formula: { formula: 'Mean = Sum / Count', explanation: `Stats for ${nums.length} numbers` } }
    }
  },
  // DATE & TIME CALCULATORS
  'date-difference': {
    name: 'Date Difference', description: 'Days between dates', longDescription: 'Calculate days between two dates.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'start', label: 'Start Date', placeholder: '', type: 'date' }, { id: 'end', label: 'End Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.start || !inputs.end) return { results: [] }
      const start = new Date(inputs.start), end = new Date(inputs.end), diff = Math.abs(end.getTime() - start.getTime()), days = Math.ceil(diff / (1000 * 60 * 60 * 24))
      return { results: [{ label: 'Days', value: days, highlight: true }, { label: 'Weeks', value: Math.floor(days / 7) }, { label: 'Months', value: Math.floor(days / 30) }], formula: { formula: 'Days = |End - Start|', explanation: `${days} days between dates` } }
    }
  },
  age: {
    name: 'Age Calculator', description: 'Calculate exact age', longDescription: 'Calculate age from birth date.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'birthdate', label: 'Date of Birth', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.birthdate) return { results: [] }
      const birth = new Date(inputs.birthdate), today = new Date()
      let years = today.getFullYear() - birth.getFullYear(), months = today.getMonth() - birth.getMonth(), days = today.getDate() - birth.getDate()
      if (days < 0) { months--; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate() }
      if (months < 0) { years--; months += 12 }
      return { results: [{ label: 'Age', value: `${years}y ${months}m ${days}d`, highlight: true }], formula: { formula: 'Age = Today - Birth', explanation: 'Your exact age.' } }
    }
  },
  countdown: {
    name: 'Countdown Calculator', description: 'Days until date', longDescription: 'Calculate days until a future date.', category: 'datetime', icon: Timer,
    inputs: [{ id: 'date', label: 'Target Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const target = new Date(inputs.date), today = new Date()
      today.setHours(0,0,0,0); target.setHours(0,0,0,0)
      const diff = target.getTime() - today.getTime(), days = Math.ceil(diff / (1000 * 60 * 60 * 24))
      return { results: [{ label: days >= 0 ? 'Days Until' : 'Days Since', value: Math.abs(days), highlight: true }], formula: { formula: 'Countdown = Target - Today', explanation: days >= 0 ? `${days} days remaining` : `${Math.abs(days)} days passed` } }
    }
  },
  // TOOLS CALCULATORS
  temperature: {
    name: 'Temperature Converter', description: 'Convert temperatures', longDescription: 'Convert between Celsius, Fahrenheit, Kelvin.', category: 'tools', icon: ThermometerIcon,
    inputs: [{ id: 'value', label: 'Temperature', placeholder: '100' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'c', label: 'Celsius' }, { value: 'f', label: 'Fahrenheit' }, { value: 'k', label: 'Kelvin' }] }],
    calculate: (inputs) => {
      const v = parseFloat(inputs.value), from = inputs.from || 'c'
      if (isNaN(v)) return { results: [] }
      let celsius = from === 'c' ? v : from === 'f' ? (v - 32) * 5 / 9 : v - 273.15
      return { results: [{ label: 'Celsius', value: celsius.toFixed(2), unit: '°C' }, { label: 'Fahrenheit', value: (celsius * 9 / 5 + 32).toFixed(2), unit: '°F' }, { label: 'Kelvin', value: (celsius + 273.15).toFixed(2), unit: 'K', highlight: true }], formula: { formula: '°F = °C × 9/5 + 32', explanation: 'Temperature scale conversions.' } }
    }
  },
  'length-converter': {
    name: 'Length Converter', description: 'Convert length', longDescription: 'Convert between length units.', category: 'tools', icon: Ruler,
    inputs: [{ id: 'value', label: 'Value', placeholder: '100' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'm', label: 'Meters' }, { value: 'km', label: 'Kilometers' }, { value: 'mi', label: 'Miles' }, { value: 'ft', label: 'Feet' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'm', label: 'Meters' }, { value: 'km', label: 'Kilometers' }, { value: 'mi', label: 'Miles' }, { value: 'ft', label: 'Feet' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toMeters: Record<string, number> = { m: 1, km: 1000, mi: 1609.34, ft: 0.3048 }
      const meters = value * toMeters[inputs.from || 'm'], result = meters / toMeters[inputs.to || 'm']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Unit conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  'weight-converter': {
    name: 'Weight Converter', description: 'Convert weight', longDescription: 'Convert between weight units.', category: 'tools', icon: Weight,
    inputs: [{ id: 'value', label: 'Value', placeholder: '100' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'kg', label: 'Kilograms' }, { value: 'g', label: 'Grams' }, { value: 'lb', label: 'Pounds' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'kg', label: 'Kilograms' }, { value: 'g', label: 'Grams' }, { value: 'lb', label: 'Pounds' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toKg: Record<string, number> = { kg: 1, g: 0.001, lb: 0.453592 }
      const kg = value * toKg[inputs.from || 'kg'], result = kg / toKg[inputs.to || 'kg']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Weight conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  'password-generator': {
    name: 'Password Generator', description: 'Secure passwords', longDescription: 'Generate strong random passwords.', category: 'tools', icon: Shield,
    inputs: [{ id: 'length', label: 'Length', placeholder: '16' }, { id: 'options', label: 'Include', placeholder: '', type: 'select', options: [{ value: 'all', label: 'Letters, Numbers, Symbols' }, { value: 'alphanum', label: 'Letters & Numbers' }] }],
    calculate: (inputs) => {
      const length = Math.min(64, Math.max(8, parseInt(inputs.length) || 16)), options = inputs.options || 'all'
      let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      if (options !== 'letters') chars += '0123456789'
      if (options === 'all') chars += '!@#$%^&*'
      let password = ''
      for (let i = 0; i < length; i++) password += chars.charAt(Math.floor(Math.random() * chars.length))
      return { results: [{ label: 'Password', value: password, highlight: true }, { label: 'Strength', value: length >= 16 ? 'Very Strong' : 'Strong' }], formula: { formula: 'Random generation', explanation: `${length} character password` } }
    }
  },
  'random-number': {
    name: 'Random Number', description: 'Generate numbers', longDescription: 'Generate random numbers.', category: 'tools', icon: Hash,
    inputs: [{ id: 'min', label: 'Min', placeholder: '1' }, { id: 'max', label: 'Max', placeholder: '100' }, { id: 'count', label: 'Count', placeholder: '5' }],
    calculate: (inputs) => {
      const min = parseFloat(inputs.min) || 1, max = parseFloat(inputs.max) || 100, count = Math.min(20, parseInt(inputs.count) || 5)
      const numbers: number[] = []
      for (let i = 0; i < count; i++) numbers.push(Math.floor(Math.random() * (max - min + 1)) + min)
      return { results: [{ label: 'Random Numbers', value: numbers.join(', '), highlight: true }], formula: { formula: 'Random(min, max)', explanation: `${count} numbers from ${min} to ${max}` } }
    }
  },
  'data-storage': {
    name: 'Data Storage Converter', description: 'Convert data units', longDescription: 'Convert between data storage units.', category: 'tools', icon: HardDriveIcon,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1024' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'b', label: 'Bytes' }, { value: 'kb', label: 'KB' }, { value: 'mb', label: 'MB' }, { value: 'gb', label: 'GB' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'b', label: 'Bytes' }, { value: 'kb', label: 'KB' }, { value: 'mb', label: 'MB' }, { value: 'gb', label: 'GB' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toBytes: Record<string, number> = { b: 1, kb: 1024, mb: 1048576, gb: 1073741824 }
      const bytes = value * toBytes[inputs.from || 'b'], result = bytes / toBytes[inputs.to || 'b']
      return { results: [{ label: 'Result', value: result.toLocaleString(), unit: inputs.to, highlight: true }], formula: { formula: 'Binary (1024 base)', explanation: `${value} ${inputs.from} = ${result.toLocaleString()} ${inputs.to}` } }
    }
  },
  // ADDITIONAL HEALTH CALCULATORS
  'ideal-weight': {
    name: 'Ideal Weight Calculator', description: 'Calculate ideal body weight', longDescription: 'Calculate your ideal body weight using various formulas.', category: 'health', icon: Weight,
    inputs: [{ id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }, { id: 'height', label: 'Height (cm)', placeholder: '175' }],
    calculate: (inputs) => {
      const h = parseFloat(inputs.height), gender = inputs.gender || 'male'
      if (!h) return { results: [] }
      const inches = h / 2.54, base = gender === 'male' ? 50 : 45.5
      const devine = base + 2.3 * (inches - 60)
      const robinson = gender === 'male' ? 52 + 1.9 * (inches - 60) : 49 + 1.7 * (inches - 60)
      const miller = gender === 'male' ? 56.2 + 1.41 * (inches - 60) : 53.1 + 1.36 * (inches - 60)
      return { results: [{ label: 'Devine Formula', value: `${devine.toFixed(1)} kg`, highlight: true }, { label: 'Robinson', value: `${robinson.toFixed(1)} kg` }, { label: 'Miller', value: `${miller.toFixed(1)} kg` }], formula: { formula: 'Multiple formulas used', explanation: 'Ideal weight varies by formula and body type.' } }
    }
  },
  protein: {
    name: 'Protein Calculator', description: 'Daily protein requirements', longDescription: 'Calculate your daily protein needs based on activity level.', category: 'health', icon: Zap,
    inputs: [{ id: 'weight', label: 'Weight (kg)', placeholder: '70' }, { id: 'activity', label: 'Activity', placeholder: '', type: 'select', options: [{ value: 'sedentary', label: 'Sedentary (0.8g/kg)' }, { value: 'moderate', label: 'Moderate (1.2g/kg)' }, { value: 'active', label: 'Active (1.6g/kg)' }, { value: 'athlete', label: 'Athlete (2.0g/kg)' }] }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight)
      if (!w) return { results: [] }
      const multipliers: Record<string, number> = { sedentary: 0.8, moderate: 1.2, active: 1.6, athlete: 2.0 }
      const mult = multipliers[inputs.activity || 'moderate']
      const protein = w * mult
      return { results: [{ label: 'Daily Protein', value: `${Math.round(protein)}g`, highlight: true }, { label: 'Per Meal (4 meals)', value: `${Math.round(protein / 4)}g` }], pieData: [{ label: 'Protein', value: protein, color: '#ef4444' }, { label: 'Other Macros', value: 300 - protein, color: '#e5e7eb' }], formula: { formula: 'Protein = Weight × Activity Factor', explanation: `${w}kg × ${mult}g/kg = ${Math.round(protein)}g daily` } }
    }
  },
  macro: {
    name: 'Macro Calculator', description: 'Macronutrient breakdown', longDescription: 'Calculate your macronutrient split for your goals.', category: 'health', icon: PieChartIcon,
    inputs: [{ id: 'calories', label: 'Daily Calories', placeholder: '2000' }, { id: 'goal', label: 'Goal', placeholder: '', type: 'select', options: [{ value: 'balanced', label: 'Balanced (40/30/30)' }, { value: 'lowcarb', label: 'Low Carb (20/40/40)' }, { value: 'highprotein', label: 'High Protein (30/40/30)' }] }],
    calculate: (inputs) => {
      const cals = parseFloat(inputs.calories)
      if (!cals) return { results: [] }
      const ratios: Record<string, [number, number, number]> = { balanced: [0.4, 0.3, 0.3], lowcarb: [0.2, 0.4, 0.4], highprotein: [0.3, 0.4, 0.3] }
      const [carbP, proteinP, fatP] = ratios[inputs.goal || 'balanced']
      const carbs = (cals * carbP) / 4, protein = (cals * proteinP) / 4, fat = (cals * fatP) / 9
      return { results: [{ label: 'Carbs', value: `${Math.round(carbs)}g (${Math.round(carbP * 100)}%)` }, { label: 'Protein', value: `${Math.round(protein)}g (${Math.round(proteinP * 100)}%)` }, { label: 'Fat', value: `${Math.round(fat)}g (${Math.round(fatP * 100)}%)`, highlight: true }], pieData: [{ label: 'Carbs', value: carbs, color: '#3b82f6' }, { label: 'Protein', value: protein, color: '#ef4444' }, { label: 'Fat', value: fat, color: '#f59e0b' }], formula: { formula: 'Macro = Calories × Ratio ÷ Calorie per gram', explanation: 'Carbs/Protein: 4 cal/g, Fat: 9 cal/g' } }
    }
  },
  pace: {
    name: 'Pace Calculator', description: 'Running pace calculator', longDescription: 'Calculate your running pace, speed, and time.', category: 'health', icon: Timer,
    inputs: [{ id: 'distance', label: 'Distance (km)', placeholder: '5' }, { id: 'time', label: 'Time (mm:ss)', placeholder: '25:00' }],
    calculate: (inputs) => {
      const d = parseFloat(inputs.distance)
      const [mins, secs] = inputs.time.split(':').map(Number)
      if (!d || isNaN(mins)) return { results: [] }
      const totalMins = mins + (secs || 0) / 60
      const pace = totalMins / d
      const paceMins = Math.floor(pace), paceSecs = Math.round((pace - paceMins) * 60)
      const speed = (d / totalMins) * 60
      return { results: [{ label: 'Pace', value: `${paceMins}:${paceSecs.toString().padStart(2, '0')} /km`, highlight: true }, { label: 'Speed', value: `${speed.toFixed(1)} km/h` }], formula: { formula: 'Pace = Time ÷ Distance', explanation: `${totalMins.toFixed(1)} min ÷ ${d} km = ${paceMins}:${paceSecs.toString().padStart(2, '0')} per km` } }
    }
  },
  'one-rep-max': {
    name: 'One Rep Max Calculator', description: 'Estimate your max lift', longDescription: 'Calculate your estimated one-rep max from multiple reps.', category: 'health', icon: Award,
    inputs: [{ id: 'weight', label: 'Weight Lifted (kg)', placeholder: '80' }, { id: 'reps', label: 'Reps Completed', placeholder: '5' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), r = parseFloat(inputs.reps)
      if (!w || !r || r < 1) return { results: [] }
      const epley = w * (1 + r / 30)
      const brzycki = w * (36 / (37 - r))
      const lander = (100 * w) / (101.3 - 2.67 * r)
      return { results: [{ label: 'Epley 1RM', value: `${Math.round(epley)} kg`, highlight: true }, { label: 'Brzycki 1RM', value: `${Math.round(brzycki)} kg` }, { label: 'Lander 1RM', value: `${Math.round(lander)} kg` }], formula: { formula: '1RM = Weight × (1 + Reps/30)', explanation: 'Epley formula for estimating max strength.' } }
    }
  },
  pregnancy: {
    name: 'Pregnancy Calculator', description: 'Pregnancy due date', longDescription: 'Calculate your pregnancy due date and milestones.', category: 'health', icon: Heart,
    inputs: [{ id: 'lmp', label: 'Last Menstrual Period', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.lmp) return { results: [] }
      const lmp = new Date(inputs.lmp)
      const dueDate = new Date(lmp)
      dueDate.setDate(dueDate.getDate() + 280)
      const today = new Date(), weeks = Math.floor((today.getTime() - lmp.getTime()) / (7 * 24 * 60 * 60 * 1000))
      return { results: [{ label: 'Due Date', value: dueDate.toDateString(), highlight: true }, { label: 'Current Week', value: `${Math.max(0, weeks)} weeks` }], formula: { formula: 'Due Date = LMP + 280 days', explanation: '40 weeks from last menstrual period.' } }
    }
  },
  'water-intake': {
    name: 'Water Intake Calculator', description: 'Daily water needs', longDescription: 'Calculate your daily water intake requirements.', category: 'health', icon: Droplets,
    inputs: [{ id: 'weight', label: 'Weight (kg)', placeholder: '70' }, { id: 'activity', label: 'Activity Level', placeholder: '', type: 'select', options: [{ value: 'low', label: 'Low' }, { value: 'moderate', label: 'Moderate' }, { value: 'high', label: 'High' }] }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight)
      if (!w) return { results: [] }
      const base = w * 0.033
      const add = inputs.activity === 'high' ? 0.5 : inputs.activity === 'moderate' ? 0.25 : 0
      const total = base + add
      return { results: [{ label: 'Daily Water', value: `${total.toFixed(1)}L`, highlight: true }, { label: 'Glasses (250ml)', value: `${Math.round(total * 4)} glasses` }], pieData: [{ label: 'Water', value: total, color: '#3b82f6' }, { label: 'Target', value: 3 - total, color: '#e5e7eb' }], formula: { formula: 'Water = Weight × 0.033L + Activity bonus', explanation: 'Basic hydration needs plus activity adjustment.' } }
    }
  },
  sleep: {
    name: 'Sleep Calculator', description: 'Optimal sleep timing', longDescription: 'Calculate optimal bedtimes based on sleep cycles.', category: 'health', icon: Moon,
    inputs: [{ id: 'wake', label: 'Wake Time', placeholder: '07:00' }, { id: 'cycles', label: 'Sleep Cycles', placeholder: '', type: 'select', options: [{ value: '5', label: '5 cycles (7.5h)' }, { value: '6', label: '6 cycles (9h)' }, { value: '4', label: '4 cycles (6h)' }] }],
    calculate: (inputs) => {
      if (!inputs.wake) return { results: [] }
      const [h, m] = inputs.wake.split(':').map(Number)
      const wakeMinutes = h * 60 + m
      const cycles = parseInt(inputs.cycles || '6')
      const sleepMinutes = cycles * 90 + 15
      let bedMinutes = wakeMinutes - sleepMinutes
      if (bedMinutes < 0) bedMinutes += 24 * 60
      const bedH = Math.floor(bedMinutes / 60) % 24, bedM = bedMinutes % 60
      return { results: [{ label: 'Bedtime', value: `${bedH}:${bedM.toString().padStart(2, '0')}`, highlight: true }, { label: 'Sleep Duration', value: `${(cycles * 1.5).toFixed(1)} hours` }], formula: { formula: 'Bedtime = Wake - (Cycles × 90min + 15min)', explanation: '90-min cycles plus 15-min fall asleep time.' } }
    }
  },
  'heart-rate-zones': {
    name: 'Heart Rate Zones', description: 'Target heart rate zones', longDescription: 'Calculate your target heart rate zones for training.', category: 'health', icon: Heart,
    inputs: [{ id: 'age', label: 'Age', placeholder: '30' }, { id: 'resting', label: 'Resting HR (bpm)', placeholder: '65' }],
    calculate: (inputs) => {
      const age = parseFloat(inputs.age), resting = parseFloat(inputs.resting) || 70
      if (!age) return { results: [] }
      const maxHr = 220 - age
      const hrReserve = maxHr - resting
      const zones = [
        { name: 'Zone 1 (Recovery)', low: Math.round(resting + hrReserve * 0.5), high: Math.round(resting + hrReserve * 0.6) },
        { name: 'Zone 2 (Aerobic)', low: Math.round(resting + hrReserve * 0.6), high: Math.round(resting + hrReserve * 0.7) },
        { name: 'Zone 3 (Tempo)', low: Math.round(resting + hrReserve * 0.7), high: Math.round(resting + hrReserve * 0.8) },
        { name: 'Zone 4 (Threshold)', low: Math.round(resting + hrReserve * 0.8), high: Math.round(resting + hrReserve * 0.9) },
        { name: 'Zone 5 (Max)', low: Math.round(resting + hrReserve * 0.9), high: maxHr }
      ]
      return { results: [{ label: 'Max HR', value: `${maxHr} bpm`, highlight: true }, ...zones.map(z => ({ label: z.name, value: `${z.low}-${z.high} bpm` }))], formula: { formula: 'Karvonen Formula', explanation: 'Heart rate reserve method for zone calculation.' } }
    }
  },
  'body-surface-area': {
    name: 'Body Surface Area', description: 'Calculate BSA', longDescription: 'Calculate your body surface area using Du Bois formula.', category: 'health', icon: Ruler,
    inputs: [{ id: 'weight', label: 'Weight (kg)', placeholder: '70' }, { id: 'height', label: 'Height (cm)', placeholder: '175' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), h = parseFloat(inputs.height)
      if (!w || !h) return { results: [] }
      const bsa = 0.007184 * Math.pow(w, 0.425) * Math.pow(h, 0.725)
      return { results: [{ label: 'Body Surface Area', value: `${bsa.toFixed(2)} m²`, highlight: true }], formula: { formula: 'Du Bois: BSA = 0.007184 × W^0.425 × H^0.725', explanation: 'Used for drug dosing and medical calculations.' } }
    }
  },
  'lean-body-mass': {
    name: 'Lean Body Mass', description: 'Calculate LBM', longDescription: 'Calculate your lean body mass.', category: 'health', icon: Weight,
    inputs: [{ id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }, { id: 'weight', label: 'Weight (kg)', placeholder: '70' }, { id: 'height', label: 'Height (cm)', placeholder: '175' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), h = parseFloat(inputs.height), gender = inputs.gender || 'male'
      if (!w || !h) return { results: [] }
      let lbm: number
      if (gender === 'male') lbm = 0.32810 * w + 0.33929 * h - 29.5336
      else lbm = 0.29569 * w + 0.41813 * h - 43.2933
      const fatPercent = ((w - lbm) / w) * 100
      return { results: [{ label: 'Lean Body Mass', value: `${lbm.toFixed(1)} kg`, highlight: true }, { label: 'Body Fat', value: `${fatPercent.toFixed(1)}%` }], pieData: [{ label: 'Lean Mass', value: lbm, color: '#22c55e' }, { label: 'Fat Mass', value: w - lbm, color: '#f59e0b' }], formula: { formula: 'Hume Formula', explanation: 'Estimates lean mass from height and weight.' } }
    }
  },
  'waist-to-hip': {
    name: 'Waist-to-Hip Ratio', description: 'Health indicator', longDescription: 'Calculate your waist-to-hip ratio for health assessment.', category: 'health', icon: Ruler,
    inputs: [{ id: 'waist', label: 'Waist (cm)', placeholder: '85' }, { id: 'hip', label: 'Hip (cm)', placeholder: '95' }, { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }],
    calculate: (inputs) => {
      const waist = parseFloat(inputs.waist), hip = parseFloat(inputs.hip), gender = inputs.gender || 'male'
      if (!waist || !hip) return { results: [] }
      const ratio = waist / hip
      let risk: string
      if (gender === 'male') risk = ratio < 0.9 ? 'Low Risk' : ratio < 1 ? 'Moderate Risk' : 'High Risk'
      else risk = ratio < 0.8 ? 'Low Risk' : ratio < 0.85 ? 'Moderate Risk' : 'High Risk'
      return { results: [{ label: 'WHR', value: ratio.toFixed(2), highlight: true }, { label: 'Health Risk', value: risk }], formula: { formula: 'WHR = Waist ÷ Hip', explanation: `Waist-to-hip ratio indicates fat distribution.` } }
    }
  },
  'due-date': {
    name: 'Due Date Calculator', description: 'Pregnancy due date', longDescription: 'Calculate pregnancy due date from conception.', category: 'health', icon: Calendar,
    inputs: [{ id: 'conception', label: 'Conception Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.conception) return { results: [] }
      const conception = new Date(inputs.conception)
      const dueDate = new Date(conception)
      dueDate.setDate(dueDate.getDate() + 266)
      return { results: [{ label: 'Due Date', value: dueDate.toDateString(), highlight: true }], formula: { formula: 'Due Date = Conception + 266 days', explanation: '38 weeks from conception date.' } }
    }
  },
  ovulation: {
    name: 'Ovulation Calculator', description: 'Fertile days', longDescription: 'Calculate your fertile window.', category: 'health', icon: Calendar,
    inputs: [{ id: 'lmp', label: 'Last Period Start', placeholder: '', type: 'date' }, { id: 'cycle', label: 'Cycle Length (days)', placeholder: '28' }],
    calculate: (inputs) => {
      if (!inputs.lmp) return { results: [] }
      const lmp = new Date(inputs.lmp), cycle = parseFloat(inputs.cycle) || 28
      const ovulation = new Date(lmp)
      ovulation.setDate(ovulation.getDate() + cycle - 14)
      const fertileStart = new Date(ovulation), fertileEnd = new Date(ovulation)
      fertileStart.setDate(fertileStart.getDate() - 5)
      fertileEnd.setDate(fertileEnd.getDate() + 1)
      return { results: [{ label: 'Ovulation Date', value: ovulation.toDateString(), highlight: true }, { label: 'Fertile Window', value: `${fertileStart.toDateString()} - ${fertileEnd.toDateString()}` }], formula: { formula: 'Ovulation = LMP + (Cycle - 14)', explanation: '14 days before next period.' } }
    }
  },
  conception: {
    name: 'Conception Calculator', description: 'Conception timing', longDescription: 'Estimate conception date from due date.', category: 'health', icon: Calendar,
    inputs: [{ id: 'dueDate', label: 'Due Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.dueDate) return { results: [] }
      const dueDate = new Date(inputs.dueDate)
      const conception = new Date(dueDate)
      conception.setDate(conception.getDate() - 266)
      return { results: [{ label: 'Estimated Conception', value: conception.toDateString(), highlight: true }], formula: { formula: 'Conception = Due Date - 266 days', explanation: 'Average gestation from conception.' } }
    }
  },
  gfr: {
    name: 'GFR Calculator', description: 'Kidney function', longDescription: 'Estimate glomerular filtration rate.', category: 'health', icon: Activity,
    inputs: [{ id: 'creatinine', label: 'Serum Creatinine (mg/dL)', placeholder: '1.0' }, { id: 'age', label: 'Age', placeholder: '50' }, { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }],
    calculate: (inputs) => {
      const cr = parseFloat(inputs.creatinine), age = parseFloat(inputs.age), gender = inputs.gender || 'male'
      if (!cr || !age) return { results: [] }
      let gfr = 175 * Math.pow(cr, -1.154) * Math.pow(age, -0.203)
      if (gender === 'female') gfr *= 0.742
      let stage: string
      if (gfr >= 90) stage = 'Normal (Stage 1)'
      else if (gfr >= 60) stage = 'Mild Decrease (Stage 2)'
      else if (gfr >= 45) stage = 'Moderate (Stage 3a)'
      else if (gfr >= 30) stage = 'Moderate (Stage 3b)'
      else if (gfr >= 15) stage = 'Severe (Stage 4)'
      else stage = 'Kidney Failure (Stage 5)'
      return { results: [{ label: 'GFR', value: `${Math.round(gfr)} mL/min`, highlight: true }, { label: 'Stage', value: stage }], formula: { formula: 'CKD-EPI Equation', explanation: 'Estimates kidney function.' } }
    }
  },
  'blood-alcohol': {
    name: 'Blood Alcohol Calculator', description: 'BAC estimation', longDescription: 'Estimate blood alcohol concentration.', category: 'health', icon: AlertCircle,
    inputs: [{ id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }, { id: 'weight', label: 'Weight (kg)', placeholder: '70' }, { id: 'drinks', label: 'Standard Drinks', placeholder: '3' }, { id: 'hours', label: 'Hours Drinking', placeholder: '2' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), drinks = parseFloat(inputs.drinks), hours = parseFloat(inputs.hours), gender = inputs.gender || 'male'
      if (!w || !drinks) return { results: [] }
      const r = gender === 'male' ? 0.68 : 0.55
      let bac = ((drinks * 14) / (w * 1000 * r)) * 100 - hours * 0.015
      bac = Math.max(0, bac)
      let status: string
      if (bac < 0.03) status = 'Normal'
      else if (bac < 0.08) status = 'Mild Impairment'
      else if (bac < 0.15) status = 'Significant Impairment'
      else status = 'Severe Impairment'
      return { results: [{ label: 'BAC', value: `${bac.toFixed(3)}%`, highlight: true }, { label: 'Status', value: status }], infoCards: [{ title: 'Legal Limit', content: 'Most jurisdictions: 0.08% for driving', variant: 'warning' }], formula: { formula: 'Widmark Formula', explanation: 'Estimated BAC based on drinks and body weight.' } }
    }
  },
  'calories-burned': {
    name: 'Calories Burned Calculator', description: 'Exercise calories', longDescription: 'Calculate calories burned during exercise.', category: 'health', icon: FlameIcon,
    inputs: [{ id: 'activity', label: 'Activity', placeholder: '', type: 'select', options: [{ value: 'running', label: 'Running (7 MET)' }, { value: 'cycling', label: 'Cycling (6 MET)' }, { value: 'swimming', label: 'Swimming (8 MET)' }, { value: 'walking', label: 'Walking (3.5 MET)' }] }, { id: 'weight', label: 'Weight (kg)', placeholder: '70' }, { id: 'duration', label: 'Duration (min)', placeholder: '30' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), duration = parseFloat(inputs.duration)
      if (!w || !duration) return { results: [] }
      const mets: Record<string, number> = { running: 7, cycling: 6, swimming: 8, walking: 3.5 }
      const met = mets[inputs.activity || 'running']
      const calories = (met * w * duration) / 60 * 5
      return { results: [{ label: 'Calories Burned', value: Math.round(calories), unit: 'kcal', highlight: true }], pieData: [{ label: 'Burned', value: calories, color: '#ef4444' }, { label: 'Daily Target (500)', value: 500 - calories, color: '#e5e7eb' }], formula: { formula: 'Calories = MET × Weight × Time / 60 × 5', explanation: 'MET = Metabolic Equivalent of Task' } }
    }
  },
  'army-body-fat': {
    name: 'Army Body Fat Calculator', description: 'Military standard', longDescription: 'Calculate body fat using US Army standards.', category: 'health', icon: Award,
    inputs: [{ id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }, { id: 'age', label: 'Age', placeholder: '25' }, { id: 'height', label: 'Height (cm)', placeholder: '175' }, { id: 'neck', label: 'Neck (cm)', placeholder: '38' }, { id: 'waist', label: 'Waist (cm)', placeholder: '85' }, { id: 'hip', label: 'Hip (cm) - Females', placeholder: '95' }],
    calculate: (inputs) => {
      const h = parseFloat(inputs.height), n = parseFloat(inputs.neck), w = parseFloat(inputs.waist), hp = parseFloat(inputs.hip), gender = inputs.gender || 'male', age = parseFloat(inputs.age)
      if (!h || !n || !w) return { results: [] }
      let bodyFat: number
      if (gender === 'male') bodyFat = (86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76)
      else bodyFat = (163.205 * Math.log10(w + (hp || 0) - n) - 97.684 * Math.log10(h) - 78.387)
      bodyFat = Math.max(3, Math.min(50, bodyFat))
      const maxFat = gender === 'male' ? (age < 21 ? 20 : age < 28 ? 22 : 24) : (age < 21 ? 30 : age < 28 ? 32 : 34)
      const pass = bodyFat <= maxFat
      return { results: [{ label: 'Body Fat %', value: bodyFat.toFixed(1), unit: '%', highlight: true }, { label: 'Max Allowed', value: `${maxFat}%` }, { label: 'Status', value: pass ? 'PASSED' : 'EXCEEDED', icon: pass ? Check : AlertCircle }], infoCards: [{ title: pass ? 'Passed' : 'Failed', content: pass ? 'Meets Army body fat standards' : 'Exceeds maximum allowable body fat', variant: pass ? 'success' : 'warning' }], formula: { formula: 'US Army Method', explanation: 'Official military body fat calculation.' } }
    }
  },
  rmr: {
    name: 'RMR Calculator', description: 'Resting metabolic rate', longDescription: 'Calculate resting metabolic rate.', category: 'health', icon: Zap,
    inputs: [{ id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }, { id: 'weight', label: 'Weight (kg)', placeholder: '70' }, { id: 'height', label: 'Height (cm)', placeholder: '175' }, { id: 'age', label: 'Age', placeholder: '30' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), h = parseFloat(inputs.height), age = parseFloat(inputs.age), gender = inputs.gender || 'male'
      if (!w || !h || !age) return { results: [] }
      const rmr = gender === 'male' ? (10 * w + 6.25 * h - 5 * age + 5) : (10 * w + 6.25 * h - 5 * age - 161)
      return { results: [{ label: 'RMR', value: Math.round(rmr), unit: 'cal/day', highlight: true }], formula: { formula: 'Mifflin-St Jeor Equation', explanation: 'Resting metabolic rate for basic functions.' } }
    }
  },
  'ideal-body-weight': {
    name: 'Ideal Body Weight', description: 'Medical ideal weight', longDescription: 'Calculate ideal body weight for medical dosing.', category: 'health', icon: Weight,
    inputs: [{ id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }, { id: 'height', label: 'Height (cm)', placeholder: '175' }],
    calculate: (inputs) => {
      const h = parseFloat(inputs.height), gender = inputs.gender || 'male'
      if (!h) return { results: [] }
      const inches = h / 2.54
      const ibw = gender === 'male' ? 50 + 2.3 * (inches - 60) : 45.5 + 2.3 * (inches - 60)
      return { results: [{ label: 'Ideal Body Weight', value: `${ibw.toFixed(1)} kg`, highlight: true }], formula: { formula: 'Devine Formula', explanation: 'Used for medication dosing calculations.' } }
    }
  },
  'adjusted-body-weight': {
    name: 'Adjusted Body Weight', description: 'For obese patients', longDescription: 'Calculate adjusted body weight for clinical use.', category: 'health', icon: Weight,
    inputs: [{ id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }, { id: 'height', label: 'Height (cm)', placeholder: '175' }, { id: 'weight', label: 'Actual Weight (kg)', placeholder: '90' }],
    calculate: (inputs) => {
      const h = parseFloat(inputs.height), w = parseFloat(inputs.weight), gender = inputs.gender || 'male'
      if (!h || !w) return { results: [] }
      const inches = h / 2.54
      const ibw = gender === 'male' ? 50 + 2.3 * (inches - 60) : 45.5 + 2.3 * (inches - 60)
      const abw = ibw + 0.4 * (w - ibw)
      return { results: [{ label: 'Ideal BW', value: `${ibw.toFixed(1)} kg` }, { label: 'Adjusted BW', value: `${abw.toFixed(1)} kg`, highlight: true }, { label: 'Actual BW', value: `${w.toFixed(1)} kg` }], formula: { formula: 'ABW = IBW + 0.4 × (Actual - IBW)', explanation: 'Used for drug dosing in obese patients.' } }
    }
  },
  'bmi-prime': {
    name: 'BMI Prime Calculator', description: 'BMI relative to limit', longDescription: 'Calculate BMI Prime - ratio of BMI to upper limit.', category: 'health', icon: Activity,
    inputs: [{ id: 'weight', label: 'Weight (kg)', placeholder: '70' }, { id: 'height', label: 'Height (cm)', placeholder: '175' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), h = parseFloat(inputs.height)
      if (!w || !h) return { results: [] }
      const heightM = h / 100, bmi = w / Math.pow(heightM, 2), bmiPrime = bmi / 25
      return { results: [{ label: 'BMI', value: bmi.toFixed(1) }, { label: 'BMI Prime', value: bmiPrime.toFixed(2), highlight: true }], formula: { formula: 'BMI Prime = BMI / 25', explanation: 'Values > 1 indicate overweight.' } }
    }
  },
  'ponderal-index': {
    name: 'Ponderal Index', description: 'Alternative to BMI', longDescription: 'Calculate Ponderal Index for height-weight assessment.', category: 'health', icon: Activity,
    inputs: [{ id: 'weight', label: 'Weight (kg)', placeholder: '70' }, { id: 'height', label: 'Height (cm)', placeholder: '175' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), h = parseFloat(inputs.height)
      if (!w || !h) return { results: [] }
      const heightM = h / 100, pi = w / Math.pow(heightM, 3)
      return { results: [{ label: 'Ponderal Index', value: pi.toFixed(2), unit: 'kg/m³', highlight: true }], formula: { formula: 'PI = Weight / Height³', explanation: 'Normal range: 11-15 kg/m³' } }
    }
  },
  ffmi: {
    name: 'Fat-Free Mass Index', description: 'FFMI calculator', longDescription: 'Calculate fat-free mass index.', category: 'health', icon: Activity,
    inputs: [{ id: 'weight', label: 'Weight (kg)', placeholder: '80' }, { id: 'height', label: 'Height (cm)', placeholder: '175' }, { id: 'bodyfat', label: 'Body Fat %', placeholder: '15' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), h = parseFloat(inputs.height), bf = parseFloat(inputs.bodyfat)
      if (!w || !h || isNaN(bf)) return { results: [] }
      const heightM = h / 100, ffm = w * (1 - bf / 100), ffmi = ffm / Math.pow(heightM, 2), normalizedFfmi = ffmi + 6.1 * (1.8 - heightM)
      return { results: [{ label: 'FFMI', value: ffmi.toFixed(1), unit: 'kg/m²', highlight: true }, { label: 'Normalized FFMI', value: normalizedFfmi.toFixed(1), unit: 'kg/m²' }, { label: 'Fat-Free Mass', value: ffm.toFixed(1), unit: 'kg' }], formula: { formula: 'FFMI = FFM / Height²', explanation: 'Men: 18-20 average, 22+ indicates steroid use' } }
    }
  },
  // ADDITIONAL FINANCIAL CALCULATORS
  'auto-loan': {
    name: 'Auto Loan Calculator', description: 'Car loan payments', longDescription: 'Calculate auto loan monthly payments.', category: 'financial', icon: Car,
    inputs: [{ id: 'price', label: 'Car Price ($)', placeholder: '30000' }, { id: 'down', label: 'Down Payment ($)', placeholder: '5000' }, { id: 'rate', label: 'Interest Rate (%)', placeholder: '5' }, { id: 'term', label: 'Term (months)', placeholder: '60' }],
    calculate: (inputs) => {
      const price = parseFloat(inputs.price), down = parseFloat(inputs.down) || 0, rate = parseFloat(inputs.rate) / 100 / 12, term = parseFloat(inputs.term), loan = price - down
      if (!loan || !term) return { results: [] }
      const monthly = rate > 0 ? loan * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1) : loan / term
      const total = monthly * term, interest = total - loan
      return { results: [{ label: 'Monthly Payment', value: `$${Math.round(monthly).toLocaleString()}`, highlight: true }, { label: 'Total Interest', value: `$${Math.round(interest).toLocaleString()}` }], formula: { formula: 'Standard loan amortization', explanation: `${term} month term at ${inputs.rate}%` } }
    }
  },
  retirement: {
    name: 'Retirement Calculator', description: 'Retirement planning', longDescription: 'Calculate retirement savings needs.', category: 'financial', icon: PiggyBank,
    inputs: [{ id: 'age', label: 'Current Age', placeholder: '30' }, { id: 'retireAge', label: 'Retirement Age', placeholder: '65' }, { id: 'current', label: 'Current Savings ($)', placeholder: '50000' }, { id: 'monthly', label: 'Monthly Contribution ($)', placeholder: '500' }, { id: 'rate', label: 'Expected Return (%)', placeholder: '7' }],
    calculate: (inputs) => {
      const age = parseFloat(inputs.age), retireAge = parseFloat(inputs.retireAge), current = parseFloat(inputs.current) || 0, monthly = parseFloat(inputs.monthly) || 0, rate = parseFloat(inputs.rate) / 100 / 12
      const years = retireAge - age, n = years * 12
      if (n <= 0) return { results: [{ label: 'Error', value: 'Invalid ages' }] }
      const fvCurrent = current * Math.pow(1 + rate, n), fvMonthly = rate > 0 ? monthly * ((Math.pow(1 + rate, n) - 1) / rate) : monthly * n
      const total = fvCurrent + fvMonthly
      return { results: [{ label: 'Retirement Savings', value: `$${Math.round(total).toLocaleString()}`, highlight: true }, { label: 'Years to Save', value: years }], pieData: [{ label: 'Starting', value: current, color: '#3b82f6' }, { label: 'Contributions', value: monthly * n, color: '#22c55e' }, { label: 'Interest', value: total - current - monthly * n, color: '#f59e0b' }], formula: { formula: 'Compound growth formula', explanation: `${years} years of growth and contributions.` } }
    }
  },
  'percentage-change': {
    name: 'Percentage Change Calculator', description: 'Calculate % change', longDescription: 'Calculate percentage increase or decrease.', category: 'financial', icon: TrendingUp,
    inputs: [{ id: 'old', label: 'Original Value', placeholder: '100' }, { id: 'new', label: 'New Value', placeholder: '150' }],
    calculate: (inputs) => {
      const oldVal = parseFloat(inputs.old), newVal = parseFloat(inputs.new)
      if (isNaN(oldVal) || isNaN(newVal)) return { results: [] }
      const change = ((newVal - oldVal) / oldVal) * 100
      return { results: [{ label: 'Change', value: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`, highlight: true }, { label: 'Absolute Change', value: `${(newVal - oldVal).toFixed(2)}` }], formula: { formula: 'Change = ((New - Old) / Old) × 100%', explanation: `${oldVal} → ${newVal}` } }
    }
  },
  'sales-tax': {
    name: 'Sales Tax Calculator', description: 'Calculate sales tax', longDescription: 'Calculate sales tax on purchases.', category: 'financial', icon: Receipt,
    inputs: [{ id: 'price', label: 'Price ($)', placeholder: '100' }, { id: 'tax', label: 'Tax Rate (%)', placeholder: '8' }],
    calculate: (inputs) => {
      const price = parseFloat(inputs.price), tax = parseFloat(inputs.tax)
      if (!price) return { results: [] }
      const taxAmount = price * tax / 100, total = price + taxAmount
      return { results: [{ label: 'Tax Amount', value: `$${taxAmount.toFixed(2)}` }, { label: 'Total', value: `$${total.toFixed(2)}`, highlight: true }], formula: { formula: 'Total = Price × (1 + Tax%)', explanation: `${tax}% sales tax` } }
    }
  },
  'income-tax': {
    name: 'Income Tax Calculator', description: 'Estimate income tax', longDescription: 'Estimate annual income tax.', category: 'financial', icon: Landmark,
    inputs: [{ id: 'income', label: 'Annual Income ($)', placeholder: '75000' }, { id: 'filing', label: 'Filing Status', placeholder: '', type: 'select', options: [{ value: 'single', label: 'Single' }, { value: 'married', label: 'Married Filing Jointly' }] }],
    calculate: (inputs) => {
      const income = parseFloat(inputs.income)
      if (!income) return { results: [] }
      let tax = 0
      if (income <= 11000) tax = income * 0.10
      else if (income <= 44725) tax = 1100 + (income - 11000) * 0.12
      else if (income <= 95375) tax = 5147 + (income - 44725) * 0.22
      else if (income <= 183250) tax = 16290 + (income - 95375) * 0.24
      else tax = 37104 + (income - 183250) * 0.32
      const effective = (tax / income) * 100
      return { results: [{ label: 'Estimated Tax', value: `$${Math.round(tax).toLocaleString()}`, highlight: true }, { label: 'Effective Rate', value: `${effective.toFixed(1)}%` }, { label: 'Take Home', value: `$${Math.round(income - tax).toLocaleString()}` }], formula: { formula: '2024 US Tax Brackets', explanation: 'Simplified estimation.' } }
    }
  },
  'net-worth': {
    name: 'Net Worth Calculator', description: 'Calculate net worth', longDescription: 'Calculate your net worth.', category: 'financial', icon: Wallet,
    inputs: [{ id: 'assets', label: 'Total Assets ($)', placeholder: '500000' }, { id: 'liabilities', label: 'Total Liabilities ($)', placeholder: '200000' }],
    calculate: (inputs) => {
      const assets = parseFloat(inputs.assets), liabilities = parseFloat(inputs.liabilities) || 0
      if (!assets) return { results: [] }
      const netWorth = assets - liabilities
      return { results: [{ label: 'Net Worth', value: `$${netWorth.toLocaleString()}`, highlight: true }], pieData: [{ label: 'Net Worth', value: Math.max(0, netWorth), color: '#22c55e' }, { label: 'Liabilities', value: liabilities, color: '#ef4444' }], formula: { formula: 'Net Worth = Assets - Liabilities', explanation: 'Measure of financial health.' } }
    }
  },
  roi: {
    name: 'ROI Calculator', description: 'Return on investment', longDescription: 'Calculate return on investment.', category: 'financial', icon: TrendingUp,
    inputs: [{ id: 'invested', label: 'Amount Invested ($)', placeholder: '10000' }, { id: 'returned', label: 'Amount Returned ($)', placeholder: '15000' }, { id: 'years', label: 'Years Held', placeholder: '2' }],
    calculate: (inputs) => {
      const invested = parseFloat(inputs.invested), returned = parseFloat(inputs.returned), years = parseFloat(inputs.years) || 1
      if (!invested || !returned) return { results: [] }
      const gain = returned - invested, roi = (gain / invested) * 100, annualized = (Math.pow(returned / invested, 1 / years) - 1) * 100
      return { results: [{ label: 'Total ROI', value: `${roi.toFixed(1)}%`, highlight: true }, { label: 'Gain', value: `$${gain.toLocaleString()}` }, { label: 'Annualized ROI', value: `${annualized.toFixed(1)}%` }], formula: { formula: 'ROI = (Return - Investment) / Investment × 100%', explanation: 'Annualized accounts for time.' } }
    }
  },
  apr: {
    name: 'APR Calculator', description: 'Annual percentage rate', longDescription: 'Calculate APR from interest rate and fees.', category: 'financial', icon: Percent,
    inputs: [{ id: 'principal', label: 'Loan Amount ($)', placeholder: '10000' }, { id: 'interest', label: 'Interest Rate (%)', placeholder: '5' }, { id: 'fees', label: 'Fees ($)', placeholder: '500' }, { id: 'term', label: 'Term (years)', placeholder: '3' }],
    calculate: (inputs) => {
      const principal = parseFloat(inputs.principal), interest = parseFloat(inputs.interest), fees = parseFloat(inputs.fees) || 0, term = parseFloat(inputs.term)
      if (!principal || !term) return { results: [] }
      const totalCost = principal * interest / 100 * term + fees, apr = ((totalCost / principal) / term) * 100
      return { results: [{ label: 'APR', value: `${apr.toFixed(2)}%`, highlight: true }, { label: 'Total Cost', value: `$${totalCost.toLocaleString()}` }], formula: { formula: 'APR includes interest and fees', explanation: 'True cost of borrowing.' } }
    }
  },
  'debt-to-income': {
    name: 'Debt-to-Income Calculator', description: 'DTI ratio', longDescription: 'Calculate your debt-to-income ratio.', category: 'financial', icon: CreditCard,
    inputs: [{ id: 'debt', label: 'Monthly Debt Payments ($)', placeholder: '2000' }, { id: 'income', label: 'Gross Monthly Income ($)', placeholder: '6000' }],
    calculate: (inputs) => {
      const debt = parseFloat(inputs.debt), income = parseFloat(inputs.income)
      if (!debt || !income) return { results: [] }
      const dti = (debt / income) * 100
      let status: string
      if (dti <= 35) status = 'Good'
      else if (dti <= 43) status = 'Acceptable'
      else status = 'High Risk'
      return { results: [{ label: 'DTI Ratio', value: `${dti.toFixed(1)}%`, highlight: true }, { label: 'Status', value: status }], formula: { formula: 'DTI = Monthly Debt / Gross Income × 100%', explanation: 'Lenders prefer DTI below 43%.' } }
    }
  },
  inflation: {
    name: 'Inflation Calculator', description: 'Adjust for inflation', longDescription: 'Adjust values for inflation over time.', category: 'financial', icon: TrendingDown,
    inputs: [{ id: 'amount', label: 'Amount ($)', placeholder: '100' }, { id: 'fromYear', label: 'From Year', placeholder: '2010' }, { id: 'toYear', label: 'To Year', placeholder: '2024' }],
    calculate: (inputs) => {
      const amount = parseFloat(inputs.amount), fromYear = parseFloat(inputs.fromYear), toYear = parseFloat(inputs.toYear)
      if (!amount || !fromYear || !toYear) return { results: [] }
      const avgInflation = 0.025, years = toYear - fromYear
      const adjusted = amount * Math.pow(1 + avgInflation, years)
      return { results: [{ label: 'Adjusted Value', value: `$${adjusted.toFixed(2)}`, highlight: true }, { label: 'Purchasing Power Change', value: `${(((adjusted - amount) / amount) * 100).toFixed(1)}%` }], formula: { formula: 'FV = PV × (1 + inflation)^years', explanation: `Using ~2.5% average inflation.` } }
    }
  },
  currency: {
    name: 'Currency Converter', description: 'Convert currency', longDescription: 'Convert between major currencies (approximate).', category: 'financial', icon: Coins,
    inputs: [{ id: 'amount', label: 'Amount', placeholder: '100' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'usd', label: 'USD' }, { value: 'eur', label: 'EUR' }, { value: 'gbp', label: 'GBP' }, { value: 'jpy', label: 'JPY' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'eur', label: 'EUR' }, { value: 'usd', label: 'USD' }, { value: 'gbp', label: 'GBP' }, { value: 'jpy', label: 'JPY' }] }],
    calculate: (inputs) => {
      const amount = parseFloat(inputs.amount)
      if (!amount) return { results: [] }
      const rates: Record<string, Record<string, number>> = { usd: { eur: 0.92, gbp: 0.79, jpy: 149, usd: 1 }, eur: { usd: 1.09, gbp: 0.86, jpy: 162, eur: 1 }, gbp: { usd: 1.27, eur: 1.16, jpy: 189, gbp: 1 }, jpy: { usd: 0.0067, eur: 0.0062, gbp: 0.0053, jpy: 1 } }
      const rate = rates[inputs.from || 'usd']?.[inputs.to || 'eur'] || 1
      const result = amount * rate
      return { results: [{ label: 'Converted', value: `${result.toFixed(2)} ${inputs.to?.toUpperCase()}`, highlight: true }], formula: { formula: 'Approximate exchange rates', explanation: `${amount} ${inputs.from?.toUpperCase()} = ${result.toFixed(2)} ${inputs.to?.toUpperCase()}` }, infoCards: [{ title: 'Note', content: 'Rates are approximate. Check current rates for accuracy.', variant: 'info' }] }
    }
  },
  'break-even': {
    name: 'Break-Even Calculator', description: 'Business analysis', longDescription: 'Calculate break-even point for your business.', category: 'financial', icon: BarChart3,
    inputs: [{ id: 'fixed', label: 'Fixed Costs ($)', placeholder: '10000' }, { id: 'price', label: 'Price per Unit ($)', placeholder: '50' }, { id: 'variable', label: 'Variable Cost per Unit ($)', placeholder: '20' }],
    calculate: (inputs) => {
      const fixed = parseFloat(inputs.fixed), price = parseFloat(inputs.price), variable = parseFloat(inputs.variable)
      if (!fixed || !price || !variable) return { results: [] }
      const breakEven = fixed / (price - variable), revenue = breakEven * price
      return { results: [{ label: 'Break-Even Units', value: Math.ceil(breakEven), highlight: true }, { label: 'Break-Even Revenue', value: `$${Math.round(revenue).toLocaleString()}` }], formula: { formula: 'BE = Fixed Costs / (Price - Variable Cost)', explanation: 'Units needed to cover all costs.' } }
    }
  },
  amortization: {
    name: 'Amortization Calculator', description: 'Loan schedule', longDescription: 'Calculate loan amortization schedule.', category: 'financial', icon: FileText,
    inputs: [{ id: 'principal', label: 'Loan Amount ($)', placeholder: '200000' }, { id: 'rate', label: 'Interest Rate (%)', placeholder: '6' }, { id: 'term', label: 'Term (years)', placeholder: '30' }],
    calculate: (inputs) => {
      const p = parseFloat(inputs.principal), r = parseFloat(inputs.rate) / 100 / 12, n = parseFloat(inputs.term) * 12
      if (!p || !r || !n) return { results: [] }
      const monthly = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      const firstInterest = p * r, firstPrincipal = monthly - firstInterest
      return { results: [{ label: 'Monthly Payment', value: `$${Math.round(monthly).toLocaleString()}`, highlight: true }, { label: 'First Month Principal', value: `$${Math.round(firstPrincipal).toLocaleString()}` }, { label: 'First Month Interest', value: `$${Math.round(firstInterest).toLocaleString()}` }], formula: { formula: 'Standard amortization', explanation: 'Principal increases, interest decreases over time.' } }
    }
  },
  dividend: {
    name: 'Dividend Calculator', description: 'Dividend income', longDescription: 'Calculate dividend income and yield.', category: 'financial', icon: Coins,
    inputs: [{ id: 'shares', label: 'Number of Shares', placeholder: '100' }, { id: 'dividend', label: 'Dividend per Share ($)', placeholder: '2.50' }, { id: 'price', label: 'Stock Price ($)', placeholder: '100' }],
    calculate: (inputs) => {
      const shares = parseFloat(inputs.shares), dividend = parseFloat(inputs.dividend), price = parseFloat(inputs.price)
      if (!shares || !dividend) return { results: [] }
      const annual = shares * dividend * 4, yieldPercent = price ? (dividend * 4 / price) * 100 : 0
      return { results: [{ label: 'Annual Dividend', value: `$${annual.toLocaleString()}`, highlight: true }, { label: 'Quarterly Income', value: `$${(shares * dividend).toLocaleString()}` }, { label: 'Dividend Yield', value: `${yieldPercent.toFixed(2)}%` }], formula: { formula: 'Annual = Shares × Quarterly Dividend × 4', explanation: 'Assumes quarterly payments.' } }
    }
  },
  'cd-calculator': {
    name: 'CD Calculator', description: 'Certificate of Deposit', longDescription: 'Calculate CD returns.', category: 'financial', icon: Landmark,
    inputs: [{ id: 'principal', label: 'Deposit Amount ($)', placeholder: '10000' }, { id: 'rate', label: 'APY (%)', placeholder: '5' }, { id: 'term', label: 'Term (months)', placeholder: '12' }],
    calculate: (inputs) => {
      const p = parseFloat(inputs.principal), r = parseFloat(inputs.rate) / 100, t = parseFloat(inputs.term) / 12
      if (!p || !r) return { results: [] }
      const interest = p * r * t, total = p + interest
      return { results: [{ label: 'Maturity Value', value: `$${Math.round(total).toLocaleString()}`, highlight: true }, { label: 'Interest Earned', value: `$${Math.round(interest).toLocaleString()}` }], formula: { formula: 'Simple interest for CD', explanation: `${inputs.term} month term at ${inputs.rate}% APY.` } }
    }
  },
  refinance: {
    name: 'Refinance Calculator', description: 'Refinance analysis', longDescription: 'Analyze mortgage refinance savings.', category: 'financial', icon: Home,
    inputs: [{ id: 'balance', label: 'Current Balance ($)', placeholder: '250000' }, { id: 'currentRate', label: 'Current Rate (%)', placeholder: '7' }, { id: 'newRate', label: 'New Rate (%)', placeholder: '5' }, { id: 'remaining', label: 'Remaining Years', placeholder: '25' }],
    calculate: (inputs) => {
      const balance = parseFloat(inputs.balance), currentRate = parseFloat(inputs.currentRate) / 100 / 12, newRate = parseFloat(inputs.newRate) / 100 / 12, remaining = parseFloat(inputs.remaining) * 12
      if (!balance || !remaining) return { results: [] }
      const currentPayment = balance * (currentRate * Math.pow(1 + currentRate, remaining)) / (Math.pow(1 + currentRate, remaining) - 1)
      const newPayment = balance * (newRate * Math.pow(1 + newRate, remaining)) / (Math.pow(1 + newRate, remaining) - 1)
      const monthlySavings = currentPayment - newPayment, totalSavings = monthlySavings * remaining
      return { results: [{ label: 'Monthly Savings', value: `$${Math.round(monthlySavings).toLocaleString()}`, highlight: true }, { label: 'New Payment', value: `$${Math.round(newPayment).toLocaleString()}` }, { label: 'Total Savings', value: `$${Math.round(totalSavings).toLocaleString()}` }], formula: { formula: 'Compare payments at different rates', explanation: 'Refinancing can save money if rates drop.' } }
    }
  },
  payoff: {
    name: 'Debt Payoff Calculator', description: 'Debt payoff plan', longDescription: 'Calculate debt payoff timeline.', category: 'financial', icon: CreditCard,
    inputs: [{ id: 'balance', label: 'Current Balance ($)', placeholder: '5000' }, { id: 'rate', label: 'Interest Rate (%)', placeholder: '18' }, { id: 'payment', label: 'Monthly Payment ($)', placeholder: '200' }],
    calculate: (inputs) => {
      const balance = parseFloat(inputs.balance), rate = parseFloat(inputs.rate) / 100 / 12, payment = parseFloat(inputs.payment)
      if (!balance || !payment) return { results: [] }
      if (payment <= balance * rate) return { results: [{ label: 'Error', value: 'Payment too low' }] }
      const months = Math.ceil(-Math.log(1 - (balance * rate / payment)) / Math.log(1 + rate))
      const totalPaid = payment * months, interest = totalPaid - balance
      return { results: [{ label: 'Months to Pay Off', value: months, highlight: true }, { label: 'Total Interest', value: `$${Math.round(interest).toLocaleString()}` }, { label: 'Total Paid', value: `$${Math.round(totalPaid).toLocaleString()}` }], formula: { formula: 'Amortization formula', explanation: 'Higher payments = less interest.' } }
    }
  },
  // ADDITIONAL MATH CALCULATORS
  lcm: {
    name: 'LCM Calculator', description: 'Least Common Multiple', longDescription: 'Find LCM of numbers.', category: 'math', icon: Hash,
    inputs: [{ id: 'numbers', label: 'Numbers (comma-separated)', placeholder: '4, 6, 8' }],
    calculate: (inputs) => {
      const nums = inputs.numbers.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n > 0)
      if (nums.length < 2) return { results: [{ label: 'Error', value: 'Enter 2+ positive numbers' }] }
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b)
      const lcm = (a: number, b: number): number => (a * b) / gcd(a, b)
      let result = nums[0]
      for (let i = 1; i < nums.length; i++) result = lcm(result, nums[i])
      return { results: [{ label: 'LCM', value: result, highlight: true }], formula: { formula: 'LCM = (a × b) / GCD(a, b)', explanation: `LCM of ${nums.join(', ')} is ${result}` } }
    }
  },
  factorial: {
    name: 'Factorial Calculator', description: 'Calculate n!', longDescription: 'Calculate factorial of a number.', category: 'math', icon: Hash,
    inputs: [{ id: 'n', label: 'Number (0-170)', placeholder: '5' }],
    calculate: (inputs) => {
      const n = parseInt(inputs.n)
      if (isNaN(n) || n < 0 || n > 170) return { results: [{ label: 'Error', value: 'Enter 0-170' }] }
      let result = 1
      for (let i = 2; i <= n; i++) result *= i
      return { results: [{ label: `${n}!`, value: result.toLocaleString(), highlight: true }], formula: { formula: 'n! = n × (n-1) × ... × 1', explanation: `Factorial of ${n}` } }
    }
  },
  exponent: {
    name: 'Exponent Calculator', description: 'Calculate powers', longDescription: 'Calculate base raised to exponent.', category: 'math', icon: Calculator,
    inputs: [{ id: 'base', label: 'Base', placeholder: '2' }, { id: 'exponent', label: 'Exponent', placeholder: '10' }],
    calculate: (inputs) => {
      const base = parseFloat(inputs.base), exp = parseFloat(inputs.exponent)
      if (isNaN(base) || isNaN(exp)) return { results: [] }
      const result = Math.pow(base, exp)
      return { results: [{ label: 'Result', value: result.toLocaleString(), highlight: true }], formula: { formula: `${base}^${exp}`, explanation: `${base} raised to power ${exp}` } }
    }
  },
  logarithm: {
    name: 'Logarithm Calculator', description: 'Calculate logs', longDescription: 'Calculate logarithms.', category: 'math', icon: Divide,
    inputs: [{ id: 'value', label: 'Value', placeholder: '100' }, { id: 'base', label: 'Base', placeholder: '10' }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value), base = parseFloat(inputs.base) || 10
      if (isNaN(value) || value <= 0) return { results: [{ label: 'Error', value: 'Enter positive number' }] }
      const result = Math.log(value) / Math.log(base)
      return { results: [{ label: `log${base}(${value})`, value: result.toFixed(6), highlight: true }], formula: { formula: 'log_b(x) = ln(x) / ln(b)', explanation: 'Change of base formula.' } }
    }
  },
  fraction: {
    name: 'Fraction Calculator', description: 'Work with fractions', longDescription: 'Perform fraction operations.', category: 'math', icon: Divide,
    inputs: [{ id: 'num1', label: 'Numerator 1', placeholder: '1' }, { id: 'den1', label: 'Denominator 1', placeholder: '2' }, { id: 'op', label: 'Operation', placeholder: '', type: 'select', options: [{ value: 'add', label: '+' }, { value: 'sub', label: '-' }, { value: 'mul', label: '×' }, { value: 'div', label: '÷' }] }, { id: 'num2', label: 'Numerator 2', placeholder: '1' }, { id: 'den2', label: 'Denominator 2', placeholder: '4' }],
    calculate: (inputs) => {
      const n1 = parseFloat(inputs.num1), d1 = parseFloat(inputs.den1), n2 = parseFloat(inputs.num2), d2 = parseFloat(inputs.den2)
      if (!d1 || !d2) return { results: [{ label: 'Error', value: 'Invalid denominators' }] }
      let rn: number, rd: number
      switch (inputs.op) {
        case 'add': rn = n1 * d2 + n2 * d1; rd = d1 * d2; break
        case 'sub': rn = n1 * d2 - n2 * d1; rd = d1 * d2; break
        case 'mul': rn = n1 * n2; rd = d1 * d2; break
        case 'div': rn = n1 * d2; rd = d1 * n2; break
        default: return { results: [] }
      }
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b)
      const g = Math.abs(gcd(rn, rd))
      return { results: [{ label: 'Result', value: `${rn}/${rd}`, highlight: true }, { label: 'Simplified', value: `${rn/g}/${Math.abs(rd/g)}` }], formula: { formula: 'Fraction arithmetic', explanation: 'Standard fraction operations.' } }
    }
  },
  quadratic: {
    name: 'Quadratic Equation', description: 'Solve ax² + bx + c = 0', longDescription: 'Solve quadratic equations.', category: 'math', icon: Calculator,
    inputs: [{ id: 'a', label: 'a', placeholder: '1' }, { id: 'b', label: 'b', placeholder: '-5' }, { id: 'c', label: 'c', placeholder: '6' }],
    calculate: (inputs) => {
      const a = parseFloat(inputs.a), b = parseFloat(inputs.b), c = parseFloat(inputs.c)
      if (!a) return { results: [{ label: 'Error', value: 'a cannot be 0' }] }
      const discriminant = b * b - 4 * a * c
      if (discriminant < 0) return { results: [{ label: 'Solutions', value: 'Complex (no real roots)' }] }
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a), x2 = (-b - Math.sqrt(discriminant)) / (2 * a)
      return { results: [{ label: 'x₁', value: x1.toFixed(4), highlight: true }, { label: 'x₂', value: x2.toFixed(4), highlight: true }], formula: { formula: 'x = (-b ± √(b²-4ac)) / 2a', explanation: 'Quadratic formula.' } }
    }
  },
  ratio: {
    name: 'Ratio Calculator', description: 'Solve ratios', longDescription: 'Solve ratio problems.', category: 'math', icon: Divide,
    inputs: [{ id: 'a', label: 'A', placeholder: '3' }, { id: 'b', label: 'B', placeholder: '4' }, { id: 'c', label: 'C', placeholder: '6' }, { id: 'findD', label: 'Find D', placeholder: '', type: 'select', options: [{ value: 'yes', label: 'Yes' }] }],
    calculate: (inputs) => {
      const a = parseFloat(inputs.a), b = parseFloat(inputs.b), c = parseFloat(inputs.c)
      if (!a || !b || !c) return { results: [] }
      const d = (b * c) / a
      return { results: [{ label: 'D', value: d.toFixed(2), highlight: true }, { label: 'Ratio', value: `${a}:${b} = ${c}:${d.toFixed(2)}` }], formula: { formula: 'A/B = C/D', explanation: 'Cross multiplication.' } }
    }
  },
  pythagorean: {
    name: 'Pythagorean Calculator', description: 'Triangle sides', longDescription: 'Calculate triangle sides using Pythagorean theorem.', category: 'math', icon: Ruler,
    inputs: [{ id: 'a', label: 'Side a', placeholder: '3' }, { id: 'b', label: 'Side b', placeholder: '4' }],
    calculate: (inputs) => {
      const a = parseFloat(inputs.a), b = parseFloat(inputs.b)
      if (!a || !b) return { results: [] }
      const c = Math.sqrt(a * a + b * b)
      return { results: [{ label: 'Hypotenuse (c)', value: c.toFixed(4), highlight: true }], formula: { formula: 'a² + b² = c²', explanation: `√(${a}² + ${b}²) = ${c.toFixed(4)}` } }
    }
  },
  'circle-area': {
    name: 'Circle Area Calculator', description: 'Area & circumference', longDescription: 'Calculate circle area and circumference.', category: 'math', icon: Target,
    inputs: [{ id: 'radius', label: 'Radius', placeholder: '5' }],
    calculate: (inputs) => {
      const r = parseFloat(inputs.radius)
      if (!r) return { results: [] }
      const area = Math.PI * r * r, circumference = 2 * Math.PI * r
      return { results: [{ label: 'Area', value: area.toFixed(4), highlight: true }, { label: 'Circumference', value: circumference.toFixed(4) }], formula: { formula: 'A = πr², C = 2πr', explanation: `π = ${Math.PI.toFixed(6)}` } }
    }
  },
  'triangle-area': {
    name: 'Triangle Area Calculator', description: 'Calculate area', longDescription: 'Calculate triangle area.', category: 'math', icon: Target,
    inputs: [{ id: 'base', label: 'Base', placeholder: '10' }, { id: 'height', label: 'Height', placeholder: '5' }],
    calculate: (inputs) => {
      const base = parseFloat(inputs.base), height = parseFloat(inputs.height)
      if (!base || !height) return { results: [] }
      const area = 0.5 * base * height
      return { results: [{ label: 'Area', value: area.toFixed(4), highlight: true }], formula: { formula: 'Area = ½ × base × height', explanation: `½ × ${base} × ${height} = ${area}` } }
    }
  },
  rectangle: {
    name: 'Rectangle Calculator', description: 'Area & perimeter', longDescription: 'Calculate rectangle area and perimeter.', category: 'math', icon: Square,
    inputs: [{ id: 'length', label: 'Length', placeholder: '10' }, { id: 'width', label: 'Width', placeholder: '5' }],
    calculate: (inputs) => {
      const l = parseFloat(inputs.length), w = parseFloat(inputs.width)
      if (!l || !w) return { results: [] }
      const area = l * w, perimeter = 2 * (l + w)
      return { results: [{ label: 'Area', value: area.toFixed(4), highlight: true }, { label: 'Perimeter', value: perimeter.toFixed(4) }], formula: { formula: 'A = L × W, P = 2(L + W)', explanation: `Length: ${l}, Width: ${w}` } }
    }
  },
  volume: {
    name: 'Volume Calculator', description: '3D volumes', longDescription: 'Calculate volumes of 3D shapes.', category: 'math', icon: Target,
    inputs: [{ id: 'shape', label: 'Shape', placeholder: '', type: 'select', options: [{ value: 'cube', label: 'Cube' }, { value: 'sphere', label: 'Sphere' }, { value: 'cylinder', label: 'Cylinder' }] }, { id: 'r', label: 'Side/Radius', placeholder: '5' }, { id: 'h', label: 'Height (cylinder)', placeholder: '10' }],
    calculate: (inputs) => {
      const r = parseFloat(inputs.r), h = parseFloat(inputs.h), shape = inputs.shape || 'cube'
      if (!r) return { results: [] }
      let volume: number
      switch (shape) {
        case 'cube': volume = r * r * r; break
        case 'sphere': volume = (4 / 3) * Math.PI * Math.pow(r, 3); break
        case 'cylinder': volume = Math.PI * r * r * (h || r); break
        default: volume = 0
      }
      return { results: [{ label: 'Volume', value: volume.toFixed(4), unit: 'units³', highlight: true }], formula: { formula: shape === 'cube' ? 'V = s³' : shape === 'sphere' ? 'V = 4/3 πr³' : 'V = πr²h', explanation: `${shape} volume.` } }
    }
  },
  'speed-distance-time': {
    name: 'Speed/Distance/Time', description: 'Calculate any', longDescription: 'Calculate speed, distance, or time.', category: 'math', icon: Timer,
    inputs: [{ id: 'find', label: 'Find', placeholder: '', type: 'select', options: [{ value: 'speed', label: 'Speed' }, { value: 'distance', label: 'Distance' }, { value: 'time', label: 'Time' }] }, { id: 'v1', label: 'Speed (km/h)', placeholder: '60' }, { id: 'v2', label: 'Distance (km)', placeholder: '120' }, { id: 'v3', label: 'Time (hours)', placeholder: '2' }],
    calculate: (inputs) => {
      const find = inputs.find, speed = parseFloat(inputs.v1), distance = parseFloat(inputs.v2), time = parseFloat(inputs.v3)
      let result: number, label: string
      switch (find) {
        case 'speed': result = distance / time; label = 'Speed'; break
        case 'distance': result = speed * time; label = 'Distance'; break
        case 'time': result = distance / speed; label = 'Time'; break
        default: return { results: [] }
      }
      return { results: [{ label, value: result.toFixed(2), highlight: true }], formula: { formula: 'Speed = Distance / Time', explanation: 'Basic motion equation.' } }
    }
  },
  probability: {
    name: 'Probability Calculator', description: 'Calculate probability', longDescription: 'Calculate probability of events.', category: 'math', icon: Target,
    inputs: [{ id: 'favorable', label: 'Favorable Outcomes', placeholder: '3' }, { id: 'total', label: 'Total Outcomes', placeholder: '6' }],
    calculate: (inputs) => {
      const favorable = parseFloat(inputs.favorable), total = parseFloat(inputs.total)
      if (!total) return { results: [] }
      const prob = favorable / total, percent = prob * 100
      return { results: [{ label: 'Probability', value: prob.toFixed(4), highlight: true }, { label: 'Percentage', value: `${percent.toFixed(2)}%` }], formula: { formula: 'P = Favorable / Total', explanation: `${favorable} out of ${total}` } }
    }
  },
  'prime-checker': {
    name: 'Prime Checker', description: 'Check if prime', longDescription: 'Check if a number is prime.', category: 'math', icon: Hash,
    inputs: [{ id: 'n', label: 'Number', placeholder: '17' }],
    calculate: (inputs) => {
      const n = parseInt(inputs.n)
      if (isNaN(n) || n < 2) return { results: [{ label: 'Result', value: 'Enter number ≥ 2' }] }
      let isPrime = true
      for (let i = 2; i <= Math.sqrt(n); i++) { if (n % i === 0) { isPrime = false; break } }
      return { results: [{ label: 'Is Prime?', value: isPrime ? 'YES' : 'NO', highlight: true }], formula: { formula: 'Check divisibility up to √n', explanation: `${n} ${isPrime ? 'is' : 'is not'} a prime number.` } }
    }
  },
  fibonacci: {
    name: 'Fibonacci Generator', description: 'Generate sequence', longDescription: 'Generate Fibonacci numbers.', category: 'math', icon: Hash,
    inputs: [{ id: 'n', label: 'How many terms (1-50)', placeholder: '10' }],
    calculate: (inputs) => {
      const n = Math.min(50, Math.max(1, parseInt(inputs.n) || 10))
      const fib: number[] = [0, 1]
      for (let i = 2; i < n; i++) fib.push(fib[i - 1] + fib[i - 2])
      return { results: [{ label: `First ${n} terms`, value: fib.slice(0, n).join(', '), highlight: true }], formula: { formula: 'F(n) = F(n-1) + F(n-2)', explanation: 'Each number is sum of two before.' } }
    }
  },
  'arithmetic-seq': {
    name: 'Arithmetic Sequence', description: 'Calculate sequence', longDescription: 'Generate arithmetic sequence.', category: 'math', icon: Hash,
    inputs: [{ id: 'a', label: 'First Term', placeholder: '2' }, { id: 'd', label: 'Common Difference', placeholder: '3' }, { id: 'n', label: 'Number of Terms', placeholder: '10' }],
    calculate: (inputs) => {
      const a = parseFloat(inputs.a), d = parseFloat(inputs.d), n = Math.min(50, Math.max(1, parseInt(inputs.n) || 10))
      if (isNaN(a) || isNaN(d)) return { results: [] }
      const seq: number[] = []
      for (let i = 0; i < n; i++) seq.push(a + i * d)
      const sum = (n * (2 * a + (n - 1) * d)) / 2
      return { results: [{ label: 'Sequence', value: seq.join(', '), highlight: true }, { label: 'Sum', value: sum.toFixed(2) }], formula: { formula: 'aₙ = a + (n-1)d', explanation: 'Arithmetic progression.' } }
    }
  },
  'geometric-seq': {
    name: 'Geometric Sequence', description: 'Calculate sequence', longDescription: 'Generate geometric sequence.', category: 'math', icon: Hash,
    inputs: [{ id: 'a', label: 'First Term', placeholder: '2' }, { id: 'r', label: 'Common Ratio', placeholder: '3' }, { id: 'n', label: 'Number of Terms', placeholder: '10' }],
    calculate: (inputs) => {
      const a = parseFloat(inputs.a), r = parseFloat(inputs.r), n = Math.min(50, Math.max(1, parseInt(inputs.n) || 10))
      if (isNaN(a) || isNaN(r)) return { results: [] }
      const seq: number[] = []
      for (let i = 0; i < n; i++) seq.push(a * Math.pow(r, i))
      const sum = a * (Math.pow(r, n) - 1) / (r - 1)
      return { results: [{ label: 'Sequence', value: seq.join(', '), highlight: true }, { label: 'Sum', value: sum.toFixed(2) }], formula: { formula: 'aₙ = a × r^(n-1)', explanation: 'Geometric progression.' } }
    }
  },
  'complex-numbers': {
    name: 'Complex Numbers', description: 'Complex math', longDescription: 'Perform complex number operations.', category: 'math', icon: Calculator,
    inputs: [{ id: 'a1', label: 'Real Part 1', placeholder: '3' }, { id: 'b1', label: 'Imaginary Part 1', placeholder: '4' }, { id: 'op', label: 'Operation', placeholder: '', type: 'select', options: [{ value: 'add', label: 'Add' }, { value: 'mul', label: 'Multiply' }, { value: 'mag', label: 'Magnitude' }] }, { id: 'a2', label: 'Real Part 2', placeholder: '1' }, { id: 'b2', label: 'Imaginary Part 2', placeholder: '2' }],
    calculate: (inputs) => {
      const a1 = parseFloat(inputs.a1) || 0, b1 = parseFloat(inputs.b1) || 0, a2 = parseFloat(inputs.a2) || 0, b2 = parseFloat(inputs.b2) || 0
      let real: number, imag: number, label: string
      switch (inputs.op) {
        case 'add': real = a1 + a2; imag = b1 + b2; label = 'Sum'; break
        case 'mul': real = a1 * a2 - b1 * b2; imag = a1 * b2 + b1 * a2; label = 'Product'; break
        case 'mag': real = Math.sqrt(a1 * a1 + b1 * b1); imag = 0; label = 'Magnitude'; break
        default: return { results: [] }
      }
      return { results: [{ label, value: inputs.op === 'mag' ? real.toFixed(4) : `${real} + ${imag}i`, highlight: true }], formula: { formula: inputs.op === 'mag' ? '|z| = √(a² + b²)' : 'Complex arithmetic', explanation: 'Operations on complex numbers.' } }
    }
  },
  // ADDITIONAL DATE & TIME CALCULATORS
  'add-subtract-days': {
    name: 'Add/Subtract Days', description: 'Modify dates', longDescription: 'Add or subtract days from a date.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date', label: 'Start Date', placeholder: '', type: 'date' }, { id: 'days', label: 'Days to Add', placeholder: '30' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const date = new Date(inputs.date), days = parseInt(inputs.days) || 0
      date.setDate(date.getDate() + days)
      return { results: [{ label: 'Result Date', value: date.toDateString(), highlight: true }], formula: { formula: 'Date + Days', explanation: `${days > 0 ? 'Added' : 'Subtracted'} ${Math.abs(days)} days.` } }
    }
  },
  'time-difference': {
    name: 'Time Difference', description: 'Hours between', longDescription: 'Calculate difference between two times.', category: 'datetime', icon: Clock,
    inputs: [{ id: 'start', label: 'Start Time', placeholder: '09:00' }, { id: 'end', label: 'End Time', placeholder: '17:30' }],
    calculate: (inputs) => {
      if (!inputs.start || !inputs.end) return { results: [] }
      const [sh, sm] = inputs.start.split(':').map(Number), [eh, em] = inputs.end.split(':').map(Number)
      let diff = (eh * 60 + em) - (sh * 60 + sm)
      if (diff < 0) diff += 24 * 60
      const hours = Math.floor(diff / 60), mins = diff % 60
      return { results: [{ label: 'Duration', value: `${hours}h ${mins}m`, highlight: true }, { label: 'Total Minutes', value: diff }], formula: { formula: 'End - Start', explanation: 'Time duration calculation.' } }
    }
  },
  'weekday-finder': {
    name: 'Weekday Finder', description: 'Day of week', longDescription: 'Find what day of week a date falls on.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const date = new Date(inputs.date)
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      return { results: [{ label: 'Day of Week', value: days[date.getDay()], highlight: true }], formula: { formula: 'Date.getDay()', explanation: `${inputs.date} falls on a ${days[date.getDay()]}.` } }
    }
  },
  'working-days': {
    name: 'Working Days Calculator', description: 'Business days', longDescription: 'Calculate business days between dates.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'start', label: 'Start Date', placeholder: '', type: 'date' }, { id: 'end', label: 'End Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.start || !inputs.end) return { results: [] }
      const start = new Date(inputs.start), end = new Date(inputs.end)
      let count = 0, current = new Date(start)
      while (current <= end) {
        if (current.getDay() !== 0 && current.getDay() !== 6) count++
        current.setDate(current.getDate() + 1)
      }
      const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
      return { results: [{ label: 'Working Days', value: count, highlight: true }, { label: 'Total Days', value: totalDays }, { label: 'Weekend Days', value: totalDays - count }], formula: { formula: 'Exclude Sat & Sun', explanation: 'Monday-Friday count.' } }
    }
  },
  'time-zone': {
    name: 'Time Zone Converter', description: 'Convert zones', longDescription: 'Convert time between zones.', category: 'datetime', icon: Globe,
    inputs: [{ id: 'time', label: 'Time', placeholder: '12:00' }, { id: 'fromZone', label: 'From Zone', placeholder: '', type: 'select', options: [{ value: 'utc', label: 'UTC' }, { value: 'est', label: 'EST (UTC-5)' }, { value: 'pst', label: 'PST (UTC-8)' }, { value: 'ist', label: 'IST (UTC+5:30)' }] }, { id: 'toZone', label: 'To Zone', placeholder: '', type: 'select', options: [{ value: 'utc', label: 'UTC' }, { value: 'est', label: 'EST (UTC-5)' }, { value: 'pst', label: 'PST (UTC-8)' }, { value: 'ist', label: 'IST (UTC+5:30)' }] }],
    calculate: (inputs) => {
      if (!inputs.time) return { results: [] }
      const offsets: Record<string, number> = { utc: 0, est: -5, pst: -8, ist: 5.5 }
      const [h, m] = inputs.time.split(':').map(Number)
      const fromOffset = offsets[inputs.fromZone || 'utc'] || 0
      const toOffset = offsets[inputs.toZone || 'utc'] || 0
      let totalMins = h * 60 + m - fromOffset * 60 + toOffset * 60
      if (totalMins < 0) totalMins += 24 * 60
      if (totalMins >= 24 * 60) totalMins -= 24 * 60
      const newH = Math.floor(totalMins / 60), newM = totalMins % 60
      return { results: [{ label: 'Converted Time', value: `${newH.toString().padStart(2, '0')}:${newM.toString().padStart(2, '0')}`, highlight: true }], formula: { formula: 'Time + Offset Difference', explanation: `${inputs.fromZone} to ${inputs.toZone}` } }
    }
  },
  epoch: {
    name: 'Epoch Converter', description: 'Unix timestamp', longDescription: 'Convert Unix timestamps.', category: 'datetime', icon: Clock,
    inputs: [{ id: 'timestamp', label: 'Unix Timestamp', placeholder: '1704067200' }],
    calculate: (inputs) => {
      const ts = parseFloat(inputs.timestamp)
      if (isNaN(ts)) return { results: [] }
      const date = new Date(ts * 1000)
      return { results: [{ label: 'Date/Time', value: date.toString(), highlight: true }, { label: 'ISO Format', value: date.toISOString() }], formula: { formula: 'Unix = seconds since Jan 1, 1970', explanation: 'Convert timestamp to readable date.' } }
    }
  },
  duration: {
    name: 'Duration Converter', description: 'Convert durations', longDescription: 'Convert between time units.', category: 'datetime', icon: Timer,
    inputs: [{ id: 'value', label: 'Value', placeholder: '3600' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'seconds', label: 'Seconds' }, { value: 'minutes', label: 'Minutes' }, { value: 'hours', label: 'Hours' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toSeconds: Record<string, number> = { seconds: 1, minutes: 60, hours: 3600 }
      const secs = value * toSeconds[inputs.from || 'seconds']
      const hours = Math.floor(secs / 3600), mins = Math.floor((secs % 3600) / 60), s = Math.floor(secs % 60)
      return { results: [{ label: 'Hours:Minutes:Seconds', value: `${hours}:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`, highlight: true }, { label: 'Total Seconds', value: secs }], formula: { formula: 'Time unit conversion', explanation: 'Convert to different time units.' } }
    }
  },
  'leap-year': {
    name: 'Leap Year Checker', description: 'Check leap year', longDescription: 'Check if a year is a leap year.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'year', label: 'Year', placeholder: '2024' }],
    calculate: (inputs) => {
      const year = parseInt(inputs.year)
      if (isNaN(year)) return { results: [] }
      const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
      return { results: [{ label: 'Is Leap Year?', value: isLeap ? 'YES' : 'NO', highlight: true }], formula: { formula: 'Leap if: (÷4 and not ÷100) or ÷400', explanation: `${year} ${isLeap ? 'is' : 'is not'} a leap year.` } }
    }
  },
  'add-months': {
    name: 'Add Months Calculator', description: 'Date arithmetic', longDescription: 'Add months to a date.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date', label: 'Start Date', placeholder: '', type: 'date' }, { id: 'months', label: 'Months to Add', placeholder: '6' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const date = new Date(inputs.date), months = parseInt(inputs.months) || 0
      date.setMonth(date.getMonth() + months)
      return { results: [{ label: 'Result Date', value: date.toDateString(), highlight: true }], formula: { formula: 'Date + Months', explanation: `Added ${months} months.` } }
    }
  },
  quarter: {
    name: 'Quarter Calculator', description: 'Fiscal quarter', longDescription: 'Find fiscal quarter for a date.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const date = new Date(inputs.date), month = date.getMonth() + 1
      const quarter = Math.ceil(month / 3)
      return { results: [{ label: 'Quarter', value: `Q${quarter}`, highlight: true }, { label: 'Year', value: date.getFullYear() }], formula: { formula: 'Q = ceil(Month / 3)', explanation: `Month ${month} falls in Q${quarter}.` } }
    }
  },
  'week-number': {
    name: 'Week Number Calculator', description: 'Week of year', longDescription: 'Find week number of the year.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const date = new Date(inputs.date)
      const start = new Date(date.getFullYear(), 0, 1)
      const week = Math.ceil(((date.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7)
      return { results: [{ label: 'Week Number', value: week, highlight: true }], formula: { formula: 'ISO Week Number', explanation: `Week ${week} of ${date.getFullYear()}.` } }
    }
  },
  'days-until-birthday': {
    name: 'Days Until Birthday', description: 'Birthday countdown', longDescription: 'Calculate days until next birthday.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'birthdate', label: 'Birthday', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.birthdate) return { results: [] }
      const today = new Date(), birth = new Date(inputs.birthdate)
      let next = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
      if (next < today) next.setFullYear(today.getFullYear() + 1)
      const days = Math.ceil((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      return { results: [{ label: 'Days Until Birthday', value: days, highlight: true }, { label: 'Date', value: next.toDateString() }], formula: { formula: 'Next Birthday - Today', explanation: `${days} days until your birthday!` } }
    }
  },
  'meeting-duration': {
    name: 'Meeting Duration', description: 'Calculate length', longDescription: 'Calculate meeting duration.', category: 'datetime', icon: Clock,
    inputs: [{ id: 'start', label: 'Start Time', placeholder: '09:00' }, { id: 'end', label: 'End Time', placeholder: '10:30' }],
    calculate: (inputs) => {
      if (!inputs.start || !inputs.end) return { results: [] }
      const [sh, sm] = inputs.start.split(':').map(Number), [eh, em] = inputs.end.split(':').map(Number)
      let diff = (eh * 60 + em) - (sh * 60 + sm)
      if (diff < 0) diff += 24 * 60
      const hours = Math.floor(diff / 60), mins = diff % 60
      return { results: [{ label: 'Duration', value: `${hours}h ${mins}m`, highlight: true }], formula: { formula: 'End - Start', explanation: 'Meeting length.' } }
    }
  },
  'daylight-hours': {
    name: 'Daylight Hours', description: 'Daylight', longDescription: 'Calculate daylight hours for a date.', category: 'datetime', icon: Sun,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }, { id: 'lat', label: 'Latitude', placeholder: '40.7' }],
    calculate: (inputs) => {
      const date = inputs.date ? new Date(inputs.date) : new Date(), lat = parseFloat(inputs.lat) || 40.7
      const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
      const declination = -23.45 * Math.cos((360 / 365) * (dayOfYear + 10) * Math.PI / 180)
      const hourAngle = Math.acos(-Math.tan(lat * Math.PI / 180) * Math.tan(declination * Math.PI / 180)) * 180 / Math.PI
      const daylight = (2 * hourAngle / 15)
      return { results: [{ label: 'Daylight Hours', value: `${daylight.toFixed(1)} hours`, highlight: true }], formula: { formula: 'Based on latitude and date', explanation: 'Approximate daylight duration.' } }
    }
  },
  'decimal-time': {
    name: 'Decimal Time Converter', description: 'Convert time', longDescription: 'Convert between standard and decimal time.', category: 'datetime', icon: Clock,
    inputs: [{ id: 'time', label: 'Time (HH:MM)', placeholder: '02:30' }],
    calculate: (inputs) => {
      if (!inputs.time) return { results: [] }
      const [h, m] = inputs.time.split(':').map(Number)
      const decimal = h + m / 60
      return { results: [{ label: 'Decimal Hours', value: decimal.toFixed(4), highlight: true }], formula: { formula: 'Decimal = Hours + Minutes/60', explanation: `${h}h ${m}m = ${decimal.toFixed(2)} hours` } }
    }
  },
  'world-clock': {
    name: 'World Clock', description: 'Time worldwide', longDescription: 'Show time in multiple cities.', category: 'datetime', icon: Globe,
    inputs: [],
    calculate: () => {
      const now = new Date()
      const cities = [
        { name: 'New York', offset: -5 },
        { name: 'London', offset: 0 },
        { name: 'Tokyo', offset: 9 },
        { name: 'Sydney', offset: 11 },
        { name: 'Dubai', offset: 4 }
      ]
      const times = cities.map(city => {
        const utc = now.getTime() + now.getTimezoneOffset() * 60000
        const cityTime = new Date(utc + city.offset * 3600000)
        return { label: city.name, value: cityTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      })
      return { results: [{ label: 'UTC Time', value: now.toUTCString().slice(17, 22), highlight: true }, ...times], formula: { formula: 'Current time in major cities', explanation: 'Times shown in local time zones.' } }
    }
  },
  'time-elapsed': {
    name: 'Time Elapsed', description: 'Time since', longDescription: 'Calculate time elapsed since a date.', category: 'datetime', icon: Timer,
    inputs: [{ id: 'date', label: 'Start Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const start = new Date(inputs.date), now = new Date()
      const diff = now.getTime() - start.getTime()
      const days = Math.floor(diff / 86400000), hours = Math.floor((diff % 86400000) / 3600000), mins = Math.floor((diff % 3600000) / 60000)
      return { results: [{ label: 'Elapsed', value: `${days}d ${hours}h ${mins}m`, highlight: true }], formula: { formula: 'Now - Start', explanation: 'Time since the given date.' } }
    }
  },
  'date-range': {
    name: 'Date Range Generator', description: 'Generate dates', longDescription: 'Generate a list of dates.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'start', label: 'Start Date', placeholder: '', type: 'date' }, { id: 'end', label: 'End Date', placeholder: '', type: 'date' }, { id: 'step', label: 'Step (days)', placeholder: '7' }],
    calculate: (inputs) => {
      if (!inputs.start || !inputs.end) return { results: [] }
      const start = new Date(inputs.start), end = new Date(inputs.end), step = parseInt(inputs.step) || 1
      const dates: string[] = []
      const current = new Date(start)
      while (current <= end) {
        dates.push(current.toDateString())
        current.setDate(current.getDate() + step)
      }
      return { results: [{ label: 'Generated Dates', value: dates.slice(0, 10).join(', ') + (dates.length > 10 ? '...' : ''), highlight: true }, { label: 'Total Dates', value: dates.length }], formula: { formula: 'Range with step', explanation: `Every ${step} days.` } }
    }
  },
  'zodiac-sign': {
    name: 'Zodiac Sign Finder', description: 'Find your sign', longDescription: 'Find your zodiac sign from birth date.', category: 'datetime', icon: Star,
    inputs: [{ id: 'birthdate', label: 'Birth Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.birthdate) return { results: [] }
      const date = new Date(inputs.birthdate), month = date.getMonth() + 1, day = date.getDate()
      const signs = [
        { name: 'Capricorn', start: [12, 22], end: [1, 19] },
        { name: 'Aquarius', start: [1, 20], end: [2, 18] },
        { name: 'Pisces', start: [2, 19], end: [3, 20] },
        { name: 'Aries', start: [3, 21], end: [4, 19] },
        { name: 'Taurus', start: [4, 20], end: [5, 20] },
        { name: 'Gemini', start: [5, 21], end: [6, 20] },
        { name: 'Cancer', start: [6, 21], end: [7, 22] },
        { name: 'Leo', start: [7, 23], end: [8, 22] },
        { name: 'Virgo', start: [8, 23], end: [9, 22] },
        { name: 'Libra', start: [9, 23], end: [10, 22] },
        { name: 'Scorpio', start: [10, 23], end: [11, 21] },
        { name: 'Sagittarius', start: [11, 22], end: [12, 21] }
      ]
      const sign = signs.find(s => (month === s.start[0] && day >= s.start[1]) || (month === s.end[0] && day <= s.end[1])) || signs[0]
      return { results: [{ label: 'Zodiac Sign', value: sign.name, highlight: true }], formula: { formula: 'Based on birth month and day', explanation: `${month}/${day} = ${sign.name}` } }
    }
  },
  'lunar-age': {
    name: 'Lunar Age Calculator', description: 'Chinese calendar', longDescription: 'Calculate lunar age for Chinese calendar.', category: 'datetime', icon: Moon,
    inputs: [{ id: 'birthdate', label: 'Birth Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.birthdate) return { results: [] }
      const birth = new Date(inputs.birthdate), now = new Date()
      let lunarAge = now.getFullYear() - birth.getFullYear() + 1
      const chineseNewYear = new Date(now.getFullYear(), 1, 10)
      if (now < chineseNewYear) lunarAge--
      return { results: [{ label: 'Lunar Age', value: lunarAge, highlight: true }], formula: { formula: 'Age + 1 (born as age 1)', explanation: 'Chinese lunar calendar age.' } }
    }
  },
  'pet-age': {
    name: 'Pet Age Calculator', description: 'Pet years', longDescription: 'Calculate pet age in human years.', category: 'datetime', icon: Heart,
    inputs: [{ id: 'age', label: 'Pet Age (years)', placeholder: '3' }, { id: 'type', label: 'Pet Type', placeholder: '', type: 'select', options: [{ value: 'dog', label: 'Dog' }, { value: 'cat', label: 'Cat' }] }],
    calculate: (inputs) => {
      const age = parseFloat(inputs.age), type = inputs.type || 'dog'
      if (!age) return { results: [] }
      let humanYears: number
      if (type === 'dog') humanYears = age <= 2 ? age * 10.5 : 21 + (age - 2) * 4
      else humanYears = age <= 2 ? age * 12.5 : 25 + (age - 2) * 4
      return { results: [{ label: 'Human Years', value: humanYears.toFixed(1), highlight: true }], formula: { formula: type === 'dog' ? 'First 2 years × 10.5, then +4 per year' : 'First 2 years × 12.5, then +4 per year', explanation: `${type} age conversion.` } }
    }
  },
  // ADDITIONAL TOOLS CALCULATORS
  'volume-converter': {
    name: 'Volume Converter', description: 'Convert volume', longDescription: 'Convert between volume units.', category: 'tools', icon: Droplets,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'l', label: 'Liters' }, { value: 'gal', label: 'Gallons' }, { value: 'ml', label: 'Milliliters' }, { value: 'qt', label: 'Quarts' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'l', label: 'Liters' }, { value: 'gal', label: 'Gallons' }, { value: 'ml', label: 'Milliliters' }, { value: 'qt', label: 'Quarts' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toLiters: Record<string, number> = { l: 1, gal: 3.785, ml: 0.001, qt: 0.946 }
      const liters = value * toLiters[inputs.from || 'l'], result = liters / toLiters[inputs.to || 'l']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Volume conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  'area-converter': {
    name: 'Area Converter', description: 'Convert area', longDescription: 'Convert between area units.', category: 'tools', icon: Square,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'sqm', label: 'Square Meters' }, { value: 'sqft', label: 'Square Feet' }, { value: 'acre', label: 'Acres' }, { value: 'ha', label: 'Hectares' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'sqm', label: 'Square Meters' }, { value: 'sqft', label: 'Square Feet' }, { value: 'acre', label: 'Acres' }, { value: 'ha', label: 'Hectares' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toSqm: Record<string, number> = { sqm: 1, sqft: 0.0929, acre: 4047, ha: 10000 }
      const sqm = value * toSqm[inputs.from || 'sqm'], result = sqm / toSqm[inputs.to || 'sqm']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Area conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  'speed-converter': {
    name: 'Speed Converter', description: 'Convert speed', longDescription: 'Convert between speed units.', category: 'tools', icon: Wind,
    inputs: [{ id: 'value', label: 'Value', placeholder: '100' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'kmh', label: 'km/h' }, { value: 'mph', label: 'mph' }, { value: 'ms', label: 'm/s' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'kmh', label: 'km/h' }, { value: 'mph', label: 'mph' }, { value: 'ms', label: 'm/s' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toKmh: Record<string, number> = { kmh: 1, mph: 1.609, ms: 3.6 }
      const kmh = value * toKmh[inputs.from || 'kmh'], result = kmh / toKmh[inputs.to || 'kmh']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Speed conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  'fuel-economy': {
    name: 'Fuel Economy Converter', description: 'MPG conversion', longDescription: 'Convert fuel economy units.', category: 'tools', icon: Car,
    inputs: [{ id: 'value', label: 'Value', placeholder: '30' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'mpg', label: 'MPG (US)' }, { value: 'lp100k', label: 'L/100km' }, { value: 'kpl', label: 'km/L' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'mpg', label: 'MPG (US)' }, { value: 'lp100k', label: 'L/100km' }, { value: 'kpl', label: 'km/L' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value) || value === 0) return { results: [] }
      const toKpl: Record<string, number> = { mpg: 0.425, lp100k: 100, kpl: 1 }
      let result: number
      if (inputs.from === 'lp100k' && inputs.to !== 'lp100k') result = 100 / value * toKpl[inputs.to || 'mpg'] / toKpl['lp100k']
      else if (inputs.to === 'lp100k') result = 100 / (value * toKpl[inputs.from || 'mpg'])
      else result = value * toKpl[inputs.from || 'mpg'] / toKpl[inputs.to || 'mpg']
      return { results: [{ label: 'Result', value: result.toFixed(2), unit: inputs.to, highlight: true }], formula: { formula: 'Fuel economy conversion', explanation: `${value} ${inputs.from}` } }
    }
  },
  'color-converter': {
    name: 'Color Converter', description: 'HEX/RGB/HSL', longDescription: 'Convert between color formats.', category: 'tools', icon: PaletteIcon,
    inputs: [{ id: 'hex', label: 'HEX Color', placeholder: '#FF5733' }],
    calculate: (inputs) => {
      let hex = inputs.hex.replace('#', '')
      if (hex.length === 3) hex = hex.split('').map(c => c + c).join('')
      if (!/^[0-9A-Fa-f]{6}$/.test(hex)) return { results: [{ label: 'Error', value: 'Invalid HEX' }] }
      const r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16)
      const h = r / 255, s = g / 255, l = b / 255
      const max = Math.max(h, s, l), min = Math.min(h, s, l)
      let hsl: number, sat: number, light = (max + min) / 2
      if (max === min) { hsl = 0; sat = 0 }
      else {
        const d = max - min
        sat = light > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
          case h: hsl = ((s - l) / d + (s < l ? 6 : 0)) / 6; break
          case s: hsl = ((l - h) / d + 2) / 6; break
          case l: hsl = ((h - s) / d + 4) / 6; break
          default: hsl = 0
        }
      }
      return { results: [{ label: 'HEX', value: `#${hex}`, highlight: true }, { label: 'RGB', value: `rgb(${r}, ${g}, ${b})` }, { label: 'HSL', value: `hsl(${Math.round(hsl * 360)}, ${Math.round(sat * 100)}%, ${Math.round(light * 100)}%)` }], formula: { formula: 'Color space conversion', explanation: 'Convert between HEX, RGB, and HSL.' } }
    }
  },
  'text-counter': {
    name: 'Text Counter', description: 'Count chars', longDescription: 'Count characters, words, and lines.', category: 'tools', icon: FileText,
    inputs: [{ id: 'text', label: 'Text', placeholder: 'Enter your text here...' }],
    calculate: (inputs) => {
      const text = inputs.text || ''
      const chars = text.length, charsNoSpace = text.replace(/\s/g, '').length, words = text.trim() ? text.trim().split(/\s+/).length : 0, lines = text ? text.split('\n').length : 0
      return { results: [{ label: 'Characters', value: chars, highlight: true }, { label: 'Characters (no spaces)', value: charsNoSpace }, { label: 'Words', value: words }, { label: 'Lines', value: lines }], formula: { formula: 'Text statistics', explanation: 'Basic text analysis.' } }
    }
  },
  'case-converter': {
    name: 'Case Converter', description: 'Convert case', longDescription: 'Convert text case.', category: 'tools', icon: FileText,
    inputs: [{ id: 'text', label: 'Text', placeholder: 'Enter text' }],
    calculate: (inputs) => {
      const text = inputs.text || ''
      return { results: [{ label: 'UPPERCASE', value: text.toUpperCase() }, { label: 'lowercase', value: text.toLowerCase() }, { label: 'Title Case', value: text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()), highlight: true }, { label: 'Sentence case', value: text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() }], formula: { formula: 'Case transformation', explanation: 'Convert between text cases.' } }
    }
  },
  binary: {
    name: 'Binary Converter', description: 'Base conversion', longDescription: 'Convert between number bases.', category: 'tools', icon: Hash,
    inputs: [{ id: 'value', label: 'Value', placeholder: '255' }, { id: 'from', label: 'From Base', placeholder: '', type: 'select', options: [{ value: '10', label: 'Decimal' }, { value: '2', label: 'Binary' }, { value: '16', label: 'Hexadecimal' }, { value: '8', label: 'Octal' }] }],
    calculate: (inputs) => {
      const value = inputs.value, from = parseInt(inputs.from || '10')
      if (!value) return { results: [] }
      const decimal = parseInt(value, from)
      return { results: [{ label: 'Decimal', value: decimal.toString(), highlight: true }, { label: 'Binary', value: decimal.toString(2) }, { label: 'Hexadecimal', value: decimal.toString(16).toUpperCase() }, { label: 'Octal', value: decimal.toString(8) }], formula: { formula: 'Base conversion', explanation: `Convert ${value} from base ${from}` } }
    }
  },
  'roman-numeral': {
    name: 'Roman Numeral Converter', description: 'Convert numerals', longDescription: 'Convert between Roman and Arabic numerals.', category: 'tools', icon: Hash,
    inputs: [{ id: 'value', label: 'Number (1-3999)', placeholder: '2024' }],
    calculate: (inputs) => {
      const num = parseInt(inputs.value)
      if (isNaN(num) || num < 1 || num > 3999) return { results: [{ label: 'Error', value: 'Enter 1-3999' }] }
      const lookup: [number, string][] = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]
      let roman = '', n = num
      for (const [val, sym] of lookup) { while (n >= val) { roman += sym; n -= val } }
      return { results: [{ label: 'Roman Numeral', value: roman, highlight: true }], formula: { formula: 'Roman numeral conversion', explanation: `${num} = ${roman}` } }
    }
  },
  'qr-data': {
    name: 'QR Data Generator', description: 'QR generation', longDescription: 'Generate QR code data string.', category: 'tools', icon: Hash,
    inputs: [{ id: 'text', label: 'Text/URL', placeholder: 'https://example.com' }],
    calculate: (inputs) => {
      const text = inputs.text || ''
      return { results: [{ label: 'QR Data', value: text.slice(0, 50) + (text.length > 50 ? '...' : ''), highlight: true }, { label: 'Length', value: text.length }], infoCards: [{ title: 'Tip', content: 'Use a QR generator API with this data to create an image.', variant: 'info' }], formula: { formula: 'Text encoding', explanation: 'Data ready for QR encoding.' } }
    }
  },
  'unit-rate': {
    name: 'Unit Rate Calculator', description: 'Price per unit', longDescription: 'Calculate price per unit for comparison.', category: 'tools', icon: Calculator,
    inputs: [{ id: 'price', label: 'Total Price ($)', placeholder: '10' }, { id: 'quantity', label: 'Quantity', placeholder: '500' }, { id: 'unit', label: 'Unit', placeholder: 'g' }],
    calculate: (inputs) => {
      const price = parseFloat(inputs.price), qty = parseFloat(inputs.quantity)
      if (!price || !qty) return { results: [] }
      const rate = price / qty
      return { results: [{ label: 'Unit Rate', value: `$${rate.toFixed(4)} per ${inputs.unit || 'unit'}`, highlight: true }, { label: 'Per 100 units', value: `$${(rate * 100).toFixed(2)}` }], formula: { formula: 'Rate = Price / Quantity', explanation: 'Compare prices effectively.' } }
    }
  },
  proportion: {
    name: 'Proportion Calculator', description: 'Solve ratios', longDescription: 'Solve proportion problems.', category: 'tools', icon: Divide,
    inputs: [{ id: 'a', label: 'A', placeholder: '3' }, { id: 'b', label: 'B', placeholder: '4' }, { id: 'c', label: 'C', placeholder: '6' }],
    calculate: (inputs) => {
      const a = parseFloat(inputs.a), b = parseFloat(inputs.b), c = parseFloat(inputs.c)
      if (!a || !b || !c) return { results: [] }
      const d = (b * c) / a
      return { results: [{ label: 'D', value: d.toFixed(4), highlight: true }, { label: 'Proportion', value: `${a}:${b} = ${c}:${d.toFixed(2)}` }], formula: { formula: 'A:B = C:D', explanation: 'Cross multiply to solve.' } }
    }
  },
  'gcd-lcm': {
    name: 'GCD & LCM Calculator', description: 'Both together', longDescription: 'Calculate both GCD and LCM.', category: 'tools', icon: Hash,
    inputs: [{ id: 'numbers', label: 'Numbers (comma-separated)', placeholder: '12, 18, 24' }],
    calculate: (inputs) => {
      const nums = inputs.numbers.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n > 0)
      if (nums.length < 2) return { results: [{ label: 'Error', value: 'Enter 2+ positive numbers' }] }
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b)
      const lcm = (a: number, b: number): number => (a * b) / gcd(a, b)
      let g = nums[0], l = nums[0]
      for (let i = 1; i < nums.length; i++) { g = gcd(g, nums[i]); l = lcm(l, nums[i]) }
      return { results: [{ label: 'GCD', value: g, highlight: true }, { label: 'LCM', value: l, highlight: true }], formula: { formula: 'GCD and LCM algorithms', explanation: `Numbers: ${nums.join(', ')}` } }
    }
  },
  energy: {
    name: 'Energy Converter', description: 'Convert energy', longDescription: 'Convert between energy units.', category: 'tools', icon: Zap,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'j', label: 'Joules' }, { value: 'cal', label: 'Calories' }, { value: 'kwh', label: 'kWh' }, { value: 'btu', label: 'BTU' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'j', label: 'Joules' }, { value: 'cal', label: 'Calories' }, { value: 'kwh', label: 'kWh' }, { value: 'btu', label: 'BTU' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toJoules: Record<string, number> = { j: 1, cal: 4.184, kwh: 3600000, btu: 1055 }
      const joules = value * toJoules[inputs.from || 'j'], result = joules / toJoules[inputs.to || 'j']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Energy conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  angle: {
    name: 'Angle Converter', description: 'Degrees/radians', longDescription: 'Convert between angle units.', category: 'tools', icon: Target,
    inputs: [{ id: 'value', label: 'Angle', placeholder: '180' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'deg', label: 'Degrees' }, { value: 'rad', label: 'Radians' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const deg = inputs.from === 'rad' ? value * (180 / Math.PI) : value
      const rad = inputs.from === 'deg' ? value * (Math.PI / 180) : value
      return { results: [{ label: 'Degrees', value: deg.toFixed(4) + '°', highlight: true }, { label: 'Radians', value: rad.toFixed(4) + ' rad' }], formula: { formula: 'rad = deg × π/180', explanation: 'Angle unit conversion.' } }
    }
  },
  pressure: {
    name: 'Pressure Converter', description: 'Convert pressure', longDescription: 'Convert between pressure units.', category: 'tools', icon: Wind,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'atm', label: 'ATM' }, { value: 'pa', label: 'Pascal' }, { value: 'bar', label: 'Bar' }, { value: 'psi', label: 'PSI' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'atm', label: 'ATM' }, { value: 'pa', label: 'Pascal' }, { value: 'bar', label: 'Bar' }, { value: 'psi', label: 'PSI' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toAtm: Record<string, number> = { atm: 1, pa: 0.00000987, bar: 0.987, psi: 0.068 }
      const atm = value * toAtm[inputs.from || 'atm'], result = atm / toAtm[inputs.to || 'atm']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Pressure conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  frequency: {
    name: 'Frequency Converter', description: 'Convert frequency', longDescription: 'Convert between frequency units.', category: 'tools', icon: Timer,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'hz', label: 'Hertz' }, { value: 'khz', label: 'Kilohertz' }, { value: 'mhz', label: 'Megahertz' }, { value: 'ghz', label: 'Gigahertz' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'hz', label: 'Hertz' }, { value: 'khz', label: 'Kilohertz' }, { value: 'mhz', label: 'Megahertz' }, { value: 'ghz', label: 'Gigahertz' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toHz: Record<string, number> = { hz: 1, khz: 1000, mhz: 1000000, ghz: 1000000000 }
      const hz = value * toHz[inputs.from || 'hz'], result = hz / toHz[inputs.to || 'hz']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Frequency conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  // NEW HEALTH CALCULATORS
  'basal-rate': {
    name: 'Basal Rate Calculator', description: 'Insulin basal rate', longDescription: 'Calculate basal insulin rate.', category: 'health', icon: Zap,
    inputs: [{ id: 'tdi', label: 'Total Daily Insulin (units)', placeholder: '40' }],
    calculate: (inputs) => {
      const tdi = parseFloat(inputs.tdi)
      if (!tdi) return { results: [] }
      const basal = tdi * 0.5, rate = basal / 24
      return { results: [{ label: 'Daily Basal', value: `${basal.toFixed(1)} units`, highlight: true }, { label: 'Hourly Rate', value: `${rate.toFixed(2)} units/hr` }], formula: { formula: 'Basal = TDI × 50%', explanation: 'Standard basal-bolus split.' } }
    }
  },
  'body-roundness': {
    name: 'Body Roundness Index', description: 'BRI calculator', longDescription: 'Calculate Body Roundness Index.', category: 'health', icon: Activity,
    inputs: [{ id: 'waist', label: 'Waist (cm)', placeholder: '85' }, { id: 'height', label: 'Height (cm)', placeholder: '175' }],
    calculate: (inputs) => {
      const waist = parseFloat(inputs.waist), height = parseFloat(inputs.height)
      if (!waist || !height) return { results: [] }
      const bri = 364.2 - 365.3 * Math.sqrt(1 - Math.pow((waist / height / 1.12), 2))
      return { results: [{ label: 'BRI', value: bri.toFixed(1), highlight: true }], formula: { formula: 'Body Roundness Index', explanation: 'Higher values indicate more visceral fat.' } }
    }
  },
  corpulence: {
    name: 'Corpulence Index', description: 'CI calculator', longDescription: 'Calculate Corpulence Index (Rohrer Index).', category: 'health', icon: Activity,
    inputs: [{ id: 'weight', label: 'Weight (kg)', placeholder: '70' }, { id: 'height', label: 'Height (cm)', placeholder: '175' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), h = parseFloat(inputs.height)
      if (!w || !h) return { results: [] }
      const ci = (w / Math.pow(h / 100, 3)) * 100
      return { results: [{ label: 'Corpulence Index', value: ci.toFixed(2), highlight: true }], formula: { formula: 'CI = Weight / Height³ × 100', explanation: 'Normal range: 10-15' } }
    }
  },
  'fat-weight': {
    name: 'Fat Weight Calculator', description: 'Fat mass weight', longDescription: 'Calculate fat mass weight.', category: 'health', icon: Weight,
    inputs: [{ id: 'weight', label: 'Weight (kg)', placeholder: '80' }, { id: 'bodyfat', label: 'Body Fat %', placeholder: '20' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), bf = parseFloat(inputs.bodyfat)
      if (!w || isNaN(bf)) return { results: [] }
      const fatMass = w * bf / 100, leanMass = w - fatMass
      return { results: [{ label: 'Fat Mass', value: `${fatMass.toFixed(1)} kg`, highlight: true }, { label: 'Lean Mass', value: `${leanMass.toFixed(1)} kg` }], pieData: [{ label: 'Fat', value: fatMass, color: '#f59e0b' }, { label: 'Lean', value: leanMass, color: '#22c55e' }] } 
    }
  },
  'healthy-weight-range': {
    name: 'Healthy Weight Range', description: 'Weight range', longDescription: 'Calculate healthy weight range for height.', category: 'health', icon: Weight,
    inputs: [{ id: 'height', label: 'Height (cm)', placeholder: '175' }],
    calculate: (inputs) => {
      const h = parseFloat(inputs.height)
      if (!h) return { results: [] }
      const heightM = h / 100, min = 18.5 * Math.pow(heightM, 2), max = 24.9 * Math.pow(heightM, 2)
      return { results: [{ label: 'Healthy Range', value: `${min.toFixed(1)} - ${max.toFixed(1)} kg`, highlight: true }], formula: { formula: 'BMI 18.5-24.9', explanation: `Based on healthy BMI range.` } }
    }
  },
  'metabolic-age': {
    name: 'Metabolic Age Calculator', description: 'Body age', longDescription: 'Estimate metabolic age based on health metrics.', category: 'health', icon: Timer,
    inputs: [{ id: 'age', label: 'Actual Age', placeholder: '35' }, { id: 'bmr', label: 'BMR', placeholder: '1600' }, { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }],
    calculate: (inputs) => {
      const age = parseFloat(inputs.age), bmr = parseFloat(inputs.bmr), gender = inputs.gender || 'male'
      if (!age || !bmr) return { results: [] }
      const avgBmr = gender === 'male' ? 1800 : 1500
      const metabolicAge = Math.round(age + (avgBmr - bmr) / 20)
      return { results: [{ label: 'Metabolic Age', value: Math.max(18, metabolicAge), highlight: true }, { label: 'Actual Age', value: age }], formula: { formula: 'Based on BMR comparison', explanation: metabolicAge < age ? 'Your metabolism is younger!' : 'Focus on improving metabolism.' } }
    }
  },
  'muscle-mass': {
    name: 'Muscle Mass Calculator', description: 'Muscle percentage', longDescription: 'Estimate muscle mass percentage.', category: 'health', icon: Award,
    inputs: [{ id: 'weight', label: 'Weight (kg)', placeholder: '70' }, { id: 'bodyfat', label: 'Body Fat %', placeholder: '18' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.weight), bf = parseFloat(inputs.bodyfat)
      if (!w || isNaN(bf)) return { results: [] }
      const leanMass = w * (1 - bf / 100)
      const muscleMass = leanMass * 0.55
      const musclePercent = (muscleMass / w) * 100
      return { results: [{ label: 'Muscle Mass', value: `${muscleMass.toFixed(1)} kg`, highlight: true }, { label: 'Muscle %', value: `${musclePercent.toFixed(1)}%` }], formula: { formula: 'Muscle ≈ 55% of lean mass', explanation: 'Estimated muscle mass.' } }
    }
  },
  'pulse-pressure': {
    name: 'Pulse Pressure Calculator', description: 'BP indicator', longDescription: 'Calculate pulse pressure from blood pressure.', category: 'health', icon: Heart,
    inputs: [{ id: 'systolic', label: 'Systolic (top)', placeholder: '120' }, { id: 'diastolic', label: 'Diastolic (bottom)', placeholder: '80' }],
    calculate: (inputs) => {
      const sys = parseFloat(inputs.systolic), dia = parseFloat(inputs.diastolic)
      if (!sys || !dia) return { results: [] }
      const pp = sys - dia
      let status: string
      if (pp < 40) status = 'Normal'
      else if (pp < 60) status = 'Elevated'
      else status = 'High - Consult doctor'
      return { results: [{ label: 'Pulse Pressure', value: `${pp} mmHg`, highlight: true }, { label: 'Status', value: status }], formula: { formula: 'PP = Systolic - Diastolic', explanation: `${sys} - ${dia} = ${pp} mmHg` } }
    }
  },
  'respiratory-rate': {
    name: 'Respiratory Rate Calculator', description: 'Breathing rate', longDescription: 'Assess respiratory rate.', category: 'health', icon: Wind,
    inputs: [{ id: 'breaths', label: 'Breaths in 30 sec', placeholder: '8' }],
    calculate: (inputs) => {
      const breaths = parseFloat(inputs.breaths)
      if (isNaN(breaths)) return { results: [] }
      const rpm = breaths * 2
      let status: string
      if (rpm >= 12 && rpm <= 20) status = 'Normal'
      else if (rpm < 12) status = 'Low (Bradypnea)'
      else status = 'High (Tachypnea)'
      return { results: [{ label: 'Breaths/min', value: rpm, highlight: true }, { label: 'Status', value: status }], formula: { formula: 'RPM = Breaths × 2', explanation: 'Normal: 12-20 breaths/minute' } }
    }
  },
  'stress-test': {
    name: 'Stress Test Calculator', description: 'Heart stress', longDescription: 'Calculate heart rate recovery after exercise.', category: 'health', icon: Activity,
    inputs: [{ id: 'maxHr', label: 'HR at Peak Exercise', placeholder: '170' }, { id: 'recovery1', label: 'HR after 1 min rest', placeholder: '150' }],
    calculate: (inputs) => {
      const maxHr = parseFloat(inputs.maxHr), recovery1 = parseFloat(inputs.recovery1)
      if (!maxHr || !recovery1) return { results: [] }
      const hrr = maxHr - recovery1
      let status: string
      if (hrr > 20) status = 'Excellent'
      else if (hrr > 12) status = 'Normal'
      else status = 'Below normal - Consult doctor'
      return { results: [{ label: 'Heart Rate Recovery', value: `${hrr} bpm`, highlight: true }, { label: 'Status', value: status }], formula: { formula: 'HRR = Peak HR - Recovery HR', explanation: 'Higher recovery = better fitness.' } }
    }
  },
  'vo2-max': {
    name: 'VO2 Max Calculator', description: 'Cardio fitness', longDescription: 'Estimate VO2 max from exercise test.', category: 'health', icon: Zap,
    inputs: [{ id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }, { id: 'age', label: 'Age', placeholder: '30' }, { id: 'restingHr', label: 'Resting HR (bpm)', placeholder: '65' }],
    calculate: (inputs) => {
      const age = parseFloat(inputs.age), rhr = parseFloat(inputs.restingHr), gender = inputs.gender || 'male'
      if (!age || !rhr) return { results: [] }
      const maxHr = 220 - age
      let vo2max: number
      if (gender === 'male') vo2max = 15.3 * (maxHr / rhr)
      else vo2max = 14.7 * (maxHr / rhr)
      let status: string
      if (vo2max >= 45) status = 'Excellent'
      else if (vo2max >= 35) status = 'Good'
      else if (vo2max >= 25) status = 'Average'
      else status = 'Below average'
      return { results: [{ label: 'VO2 Max', value: `${vo2max.toFixed(1)} ml/kg/min`, highlight: true }, { label: 'Status', value: status }], formula: { formula: 'Uth-Sørensen method', explanation: 'Estimates cardiorespiratory fitness.' } }
    }
  },
  // NEW FINANCIAL CALCULATORS
  'bond-yield': {
    name: 'Bond Yield Calculator', description: 'Bond returns', longDescription: 'Calculate bond current yield.', category: 'financial', icon: TrendingUp,
    inputs: [{ id: 'coupon', label: 'Annual Coupon ($)', placeholder: '50' }, { id: 'price', label: 'Bond Price ($)', placeholder: '950' }],
    calculate: (inputs) => {
      const coupon = parseFloat(inputs.coupon), price = parseFloat(inputs.price)
      if (!coupon || !price) return { results: [] }
      const yield_ = (coupon / price) * 100
      return { results: [{ label: 'Current Yield', value: `${yield_.toFixed(2)}%`, highlight: true }], formula: { formula: 'Yield = Coupon / Price × 100', explanation: `${coupon} / ${price} = ${yield_.toFixed(2)}%` } }
    }
  },
  'capital-gains': {
    name: 'Capital Gains Calculator', description: 'Tax calculator', longDescription: 'Calculate capital gains tax.', category: 'financial', icon: DollarSign,
    inputs: [{ id: 'purchase', label: 'Purchase Price ($)', placeholder: '10000' }, { id: 'sale', label: 'Sale Price ($)', placeholder: '15000' }, { id: 'rate', label: 'Tax Rate (%)', placeholder: '15' }],
    calculate: (inputs) => {
      const purchase = parseFloat(inputs.purchase), sale = parseFloat(inputs.sale), rate = parseFloat(inputs.rate)
      if (!purchase || !sale) return { results: [] }
      const gain = sale - purchase, tax = gain > 0 ? gain * rate / 100 : 0
      return { results: [{ label: 'Capital Gain', value: `$${gain.toLocaleString()}` }, { label: 'Tax Owed', value: `$${tax.toFixed(2)}`, highlight: true }], formula: { formula: 'Tax = Gain × Rate', explanation: gain > 0 ? 'Profitable sale' : 'Capital loss - no tax' } }
    }
  },
  'compound-annual-growth': {
    name: 'CAGR Calculator', description: 'Annual growth', longDescription: 'Calculate Compound Annual Growth Rate.', category: 'financial', icon: TrendingUp,
    inputs: [{ id: 'start', label: 'Starting Value ($)', placeholder: '10000' }, { id: 'end', label: 'Ending Value ($)', placeholder: '20000' }, { id: 'years', label: 'Years', placeholder: '5' }],
    calculate: (inputs) => {
      const start = parseFloat(inputs.start), end = parseFloat(inputs.end), years = parseFloat(inputs.years)
      if (!start || !end || !years) return { results: [] }
      const cagr = (Math.pow(end / start, 1 / years) - 1) * 100
      return { results: [{ label: 'CAGR', value: `${cagr.toFixed(2)}%`, highlight: true }], formula: { formula: 'CAGR = (End/Start)^(1/years) - 1', explanation: `${years} year growth rate.` } }
    }
  },
  'debt-payoff-date': {
    name: 'Debt Payoff Date', description: 'Payoff timeline', longDescription: 'Calculate when you\'ll be debt free.', category: 'financial', icon: Calendar,
    inputs: [{ id: 'balance', label: 'Balance ($)', placeholder: '5000' }, { id: 'rate', label: 'Interest Rate (%)', placeholder: '18' }, { id: 'payment', label: 'Monthly Payment ($)', placeholder: '200' }],
    calculate: (inputs) => {
      const balance = parseFloat(inputs.balance), rate = parseFloat(inputs.rate) / 100 / 12, payment = parseFloat(inputs.payment)
      if (!balance || !payment) return { results: [] }
      if (payment <= balance * rate) return { results: [{ label: 'Error', value: 'Payment too low' }] }
      const months = Math.ceil(-Math.log(1 - (balance * rate / payment)) / Math.log(1 + rate))
      const payoffDate = new Date()
      payoffDate.setMonth(payoffDate.getMonth() + months)
      return { results: [{ label: 'Payoff Date', value: payoffDate.toDateString(), highlight: true }, { label: 'Months', value: months }], formula: { formula: 'Amortization calculation', explanation: 'Based on consistent payments.' } }
    }
  },
  'effective-rate': {
    name: 'Effective Rate Calculator', description: 'Real interest', longDescription: 'Calculate effective annual interest rate.', category: 'financial', icon: Percent,
    inputs: [{ id: 'nominal', label: 'Nominal Rate (%)', placeholder: '12' }, { id: 'compounds', label: 'Compounds/Year', placeholder: '12' }],
    calculate: (inputs) => {
      const nominal = parseFloat(inputs.nominal) / 100, n = parseFloat(inputs.compounds)
      if (!nominal || !n) return { results: [] }
      const effective = (Math.pow(1 + nominal / n, n) - 1) * 100
      return { results: [{ label: 'Effective Rate', value: `${effective.toFixed(2)}%`, highlight: true }], formula: { formula: 'EAR = (1 + r/n)^n - 1', explanation: `Compounded ${n} times per year.` } }
    }
  },
  'future-value': {
    name: 'Future Value Calculator', description: 'Money value', longDescription: 'Calculate future value of money.', category: 'financial', icon: TrendingUp,
    inputs: [{ id: 'pv', label: 'Present Value ($)', placeholder: '1000' }, { id: 'rate', label: 'Interest Rate (%)', placeholder: '5' }, { id: 'years', label: 'Years', placeholder: '10' }],
    calculate: (inputs) => {
      const pv = parseFloat(inputs.pv), rate = parseFloat(inputs.rate) / 100, years = parseFloat(inputs.years)
      if (!pv || !rate || !years) return { results: [] }
      const fv = pv * Math.pow(1 + rate, years)
      return { results: [{ label: 'Future Value', value: `$${fv.toFixed(2)}`, highlight: true }], formula: { formula: 'FV = PV × (1 + r)^n', explanation: `${years} years at ${inputs.rate}%` } }
    }
  },
  'interest-only': {
    name: 'Interest Only Calculator', description: 'Interest payments', longDescription: 'Calculate interest-only loan payments.', category: 'financial', icon: CreditCard,
    inputs: [{ id: 'principal', label: 'Loan Amount ($)', placeholder: '100000' }, { id: 'rate', label: 'Interest Rate (%)', placeholder: '5' }],
    calculate: (inputs) => {
      const principal = parseFloat(inputs.principal), rate = parseFloat(inputs.rate) / 100 / 12
      if (!principal || !rate) return { results: [] }
      const monthly = principal * rate
      return { results: [{ label: 'Monthly Interest', value: `$${monthly.toFixed(2)}`, highlight: true }, { label: 'Annual Interest', value: `$${(monthly * 12).toFixed(2)}` }], formula: { formula: 'Interest = Principal × Rate', explanation: 'Principal unchanged during IO period.' } }
    }
  },
  'margin-calculator': {
    name: 'Margin Calculator', description: 'Profit margin', longDescription: 'Calculate profit margin percentage.', category: 'financial', icon: DollarSign,
    inputs: [{ id: 'revenue', label: 'Revenue ($)', placeholder: '1000' }, { id: 'cost', label: 'Cost ($)', placeholder: '600' }],
    calculate: (inputs) => {
      const revenue = parseFloat(inputs.revenue), cost = parseFloat(inputs.cost)
      if (!revenue) return { results: [] }
      const profit = revenue - cost, margin = (profit / revenue) * 100
      return { results: [{ label: 'Profit', value: `$${profit.toFixed(2)}` }, { label: 'Margin', value: `${margin.toFixed(2)}%`, highlight: true }], formula: { formula: 'Margin = (Revenue - Cost) / Revenue', explanation: 'Profit margin as percentage.' } }
    }
  },
  'net-present-value': {
    name: 'NPV Calculator', description: 'Investment value', longDescription: 'Calculate Net Present Value.', category: 'financial', icon: TrendingUp,
    inputs: [{ id: 'initial', label: 'Initial Investment ($)', placeholder: '10000' }, { id: 'cashflow', label: 'Annual Cash Flow ($)', placeholder: '3000' }, { id: 'years', label: 'Years', placeholder: '5' }, { id: 'rate', label: 'Discount Rate (%)', placeholder: '10' }],
    calculate: (inputs) => {
      const initial = parseFloat(inputs.initial), cf = parseFloat(inputs.cashflow), years = parseFloat(inputs.years), rate = parseFloat(inputs.rate) / 100
      if (!initial || !cf || !years || !rate) return { results: [] }
      let npv = -initial
      for (let t = 1; t <= years; t++) npv += cf / Math.pow(1 + rate, t)
      return { results: [{ label: 'NPV', value: `$${npv.toFixed(2)}`, highlight: true }, { label: 'Decision', value: npv > 0 ? 'Invest (Positive NPV)' : 'Reject (Negative NPV)' }], formula: { formula: 'NPV = Sum of discounted cash flows', explanation: 'Positive NPV = Good investment.' } }
    }
  },
  'simple-interest': {
    name: 'Simple Interest Calculator', description: 'Basic interest', longDescription: 'Calculate simple interest.', category: 'financial', icon: Percent,
    inputs: [{ id: 'principal', label: 'Principal ($)', placeholder: '10000' }, { id: 'rate', label: 'Rate (%)', placeholder: '5' }, { id: 'time', label: 'Time (years)', placeholder: '3' }],
    calculate: (inputs) => {
      const p = parseFloat(inputs.principal), r = parseFloat(inputs.rate) / 100, t = parseFloat(inputs.time)
      if (!p || !r || !t) return { results: [] }
      const interest = p * r * t, total = p + interest
      return { results: [{ label: 'Interest', value: `$${interest.toFixed(2)}` }, { label: 'Total', value: `$${total.toFixed(2)}`, highlight: true }], formula: { formula: 'I = P × R × T', explanation: `${inputs.time} years at ${inputs.rate}%` } }
    }
  },
  'time-value': {
    name: 'Time Value of Money', description: 'TVM calculator', longDescription: 'Calculate time value of money.', category: 'financial', icon: Clock,
    inputs: [{ id: 'pv', label: 'Present Value ($)', placeholder: '1000' }, { id: 'rate', label: 'Rate (%)', placeholder: '5' }, { id: 'years', label: 'Years', placeholder: '10' }],
    calculate: (inputs) => {
      const pv = parseFloat(inputs.pv), rate = parseFloat(inputs.rate) / 100, years = parseFloat(inputs.years)
      if (!pv || !rate || !years) return { results: [] }
      const fv = pv * Math.pow(1 + rate, years), pvOfFv = fv / Math.pow(1 + rate, years)
      return { results: [{ label: 'Future Value', value: `$${fv.toFixed(2)}`, highlight: true }, { label: 'PV Factor', value: (1 / Math.pow(1 + rate, years)).toFixed(4) }], formula: { formula: 'TVM relationships', explanation: 'Money now > money later.' } }
    }
  },
  // NEW MATH CALCULATORS
  'absolute-value': {
    name: 'Absolute Value Calculator', description: '|x| calculator', longDescription: 'Calculate absolute value.', category: 'math', icon: Hash,
    inputs: [{ id: 'value', label: 'Number', placeholder: '-15' }],
    calculate: (inputs) => {
      const v = parseFloat(inputs.value)
      if (isNaN(v)) return { results: [] }
      return { results: [{ label: '|x|', value: Math.abs(v), highlight: true }], formula: { formula: '|x| = absolute value', explanation: `|${v}| = ${Math.abs(v)}` } }
    }
  },
  binomial: {
    name: 'Binomial Calculator', description: 'Binomial expansion', longDescription: 'Calculate binomial coefficients.', category: 'math', icon: Calculator,
    inputs: [{ id: 'n', label: 'n', placeholder: '5' }, { id: 'k', label: 'k', placeholder: '2' }],
    calculate: (inputs) => {
      const n = parseInt(inputs.n), k = parseInt(inputs.k)
      if (isNaN(n) || isNaN(k) || k > n || k < 0) return { results: [{ label: 'Error', value: 'Invalid values' }] }
      const factorial = (x: number): number => x <= 1 ? 1 : x * factorial(x - 1)
      const result = factorial(n) / (factorial(k) * factorial(n - k))
      return { results: [{ label: 'C(n,k)', value: result, highlight: true }], formula: { formula: 'C(n,k) = n! / (k! × (n-k)!)', explanation: `${n} choose ${k} = ${result}` } }
    }
  },
  combinations: {
    name: 'Combinations Calculator', description: 'nCr calculator', longDescription: 'Calculate combinations.', category: 'math', icon: Hash,
    inputs: [{ id: 'n', label: 'Total (n)', placeholder: '10' }, { id: 'r', label: 'Choose (r)', placeholder: '3' }],
    calculate: (inputs) => {
      const n = parseInt(inputs.n), r = parseInt(inputs.r)
      if (isNaN(n) || isNaN(r) || r > n) return { results: [] }
      const factorial = (x: number): number => x <= 1 ? 1 : x * factorial(x - 1)
      const result = factorial(n) / (factorial(r) * factorial(n - r))
      return { results: [{ label: 'Combinations', value: result, highlight: true }], formula: { formula: 'nCr = n! / (r! × (n-r)!)', explanation: `Ways to choose ${r} from ${n}` } }
    }
  },
  'cube-root': {
    name: 'Cube Root Calculator', description: 'Calculate ∛x', longDescription: 'Calculate cube root.', category: 'math', icon: Square,
    inputs: [{ id: 'value', label: 'Number', placeholder: '27' }],
    calculate: (inputs) => {
      const v = parseFloat(inputs.value)
      if (isNaN(v)) return { results: [] }
      const result = Math.cbrt(v)
      return { results: [{ label: 'Cube Root', value: result.toFixed(6), highlight: true }], formula: { formula: '∛x', explanation: `∛${v} = ${result.toFixed(4)}` } }
    }
  },
  determinant: {
    name: 'Determinant Calculator', description: 'Matrix determinant', longDescription: 'Calculate 2x2 matrix determinant.', category: 'math', icon: Square,
    inputs: [{ id: 'a', label: 'a', placeholder: '1' }, { id: 'b', label: 'b', placeholder: '2' }, { id: 'c', label: 'c', placeholder: '3' }, { id: 'd', label: 'd', placeholder: '4' }],
    calculate: (inputs) => {
      const a = parseFloat(inputs.a), b = parseFloat(inputs.b), c = parseFloat(inputs.c), d = parseFloat(inputs.d)
      if ([a, b, c, d].some(isNaN)) return { results: [] }
      const det = a * d - b * c
      return { results: [{ label: 'Determinant', value: det, highlight: true }], formula: { formula: 'det = ad - bc', explanation: `|${a} ${b}| = ${det}`, steps: [`|${c} ${d}|`, `${a}×${d} - ${b}×${c} = ${det}`] } }
    }
  },
  'dot-product': {
    name: 'Dot Product Calculator', description: 'Vector product', longDescription: 'Calculate dot product of two vectors.', category: 'math', icon: Calculator,
    inputs: [{ id: 'v1', label: 'Vector 1 (comma sep)', placeholder: '1, 2, 3' }, { id: 'v2', label: 'Vector 2 (comma sep)', placeholder: '4, 5, 6' }],
    calculate: (inputs) => {
      const v1 = inputs.v1.split(',').map(Number), v2 = inputs.v2.split(',').map(Number)
      if (v1.length !== v2.length) return { results: [{ label: 'Error', value: 'Vectors must be same length' }] }
      const dot = v1.reduce((sum, v, i) => sum + v * v2[i], 0)
      return { results: [{ label: 'Dot Product', value: dot, highlight: true }], formula: { formula: 'a·b = Σ(aᵢ × bᵢ)', explanation: `Dot product = ${dot}` } }
    }
  },
  integration: {
    name: 'Integration Calculator', description: 'Integral approx', longDescription: 'Approximate definite integral.', category: 'math', icon: Calculator,
    inputs: [{ id: 'a', label: 'Coefficient', placeholder: '3' }, { id: 'power', label: 'Power (x^n)', placeholder: '2' }, { id: 'lower', label: 'Lower bound', placeholder: '0' }, { id: 'upper', label: 'Upper bound', placeholder: '2' }],
    calculate: (inputs) => {
      const a = parseFloat(inputs.a), n = parseFloat(inputs.power), lower = parseFloat(inputs.lower), upper = parseFloat(inputs.upper)
      if (isNaN(n) || isNaN(lower) || isNaN(upper)) return { results: [] }
      const integral = (a / (n + 1)) * (Math.pow(upper, n + 1) - Math.pow(lower, n + 1))
      return { results: [{ label: '∫dx', value: integral.toFixed(4), highlight: true }], formula: { formula: '∫x^n dx = x^(n+1)/(n+1)', explanation: `Definite integral approximation.` } }
    }
  },
  limit: {
    name: 'Limit Calculator', description: 'Approach value', longDescription: 'Calculate limit approximation.', category: 'math', icon: Target,
    inputs: [{ id: 'expr', label: 'Expression (use x)', placeholder: '(x^2-1)/(x-1)' }, { id: 'approach', label: 'x approaches', placeholder: '1' }],
    calculate: (inputs) => {
      const x = parseFloat(inputs.approach)
      if (isNaN(x)) return { results: [] }
      const expr = inputs.expr.replace(/\^/g, '**').replace(/x/g, `(${x + 0.0001})`)
      try {
        const result = new Function(`return ${expr}`)()
        return { results: [{ label: 'Limit ≈', value: result.toFixed(6), highlight: true }], formula: { formula: 'Numerical approximation', explanation: `As x → ${x}` } }
      } catch { return { results: [{ label: 'Error', value: 'Invalid expression' }] } }
    }
  },
  'matrix-multiply': {
    name: 'Matrix Multiply', description: 'Matrix math', longDescription: 'Multiply two 2x2 matrices.', category: 'math', icon: Square,
    inputs: [{ id: 'a1', label: 'A₁₁', placeholder: '1' }, { id: 'a2', label: 'A₁₂', placeholder: '2' }, { id: 'a3', label: 'A₂₁', placeholder: '3' }, { id: 'a4', label: 'A₂₂', placeholder: '4' }, { id: 'b1', label: 'B₁₁', placeholder: '5' }, { id: 'b2', label: 'B₁₂', placeholder: '6' }, { id: 'b3', label: 'B₂₁', placeholder: '7' }, { id: 'b4', label: 'B₂₂', placeholder: '8' }],
    calculate: (inputs) => {
      const A = [[parseFloat(inputs.a1), parseFloat(inputs.a2)], [parseFloat(inputs.a3), parseFloat(inputs.a4)]]
      const B = [[parseFloat(inputs.b1), parseFloat(inputs.b2)], [parseFloat(inputs.b3), parseFloat(inputs.b4)]]
      const C = [[A[0][0]*B[0][0] + A[0][1]*B[1][0], A[0][0]*B[0][1] + A[0][1]*B[1][1]], [A[1][0]*B[0][0] + A[1][1]*B[1][0], A[1][0]*B[0][1] + A[1][1]*B[1][1]]]
      return { results: [{ label: 'Result', value: `[[${C[0][0]}, ${C[0][1]}], [${C[1][0]}, ${C[1][1]}]]`, highlight: true }], formula: { formula: 'Matrix multiplication', explanation: '2x2 matrix product.' } }
    }
  },
  permutations: {
    name: 'Permutations Calculator', description: 'nPr calculator', longDescription: 'Calculate permutations.', category: 'math', icon: Hash,
    inputs: [{ id: 'n', label: 'Total (n)', placeholder: '10' }, { id: 'r', label: 'Arrange (r)', placeholder: '3' }],
    calculate: (inputs) => {
      const n = parseInt(inputs.n), r = parseInt(inputs.r)
      if (isNaN(n) || isNaN(r) || r > n) return { results: [] }
      const factorial = (x: number): number => x <= 1 ? 1 : x * factorial(x - 1)
      const result = factorial(n) / factorial(n - r)
      return { results: [{ label: 'Permutations', value: result, highlight: true }], formula: { formula: 'nPr = n! / (n-r)!', explanation: `Ways to arrange ${r} from ${n}` } }
    }
  },
  'standard-deviation': {
    name: 'Standard Deviation', description: 'Statistics', longDescription: 'Calculate standard deviation.', category: 'math', icon: BarChart3,
    inputs: [{ id: 'numbers', label: 'Numbers (comma-separated)', placeholder: '2, 4, 4, 4, 5, 5, 7, 9' }],
    calculate: (inputs) => {
      const nums = inputs.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n))
      if (nums.length < 2) return { results: [{ label: 'Error', value: 'Enter 2+ numbers' }] }
      const mean = nums.reduce((a, b) => a + b, 0) / nums.length
      const variance = nums.reduce((sum, n) => sum + Math.pow(n - mean, 2), 0) / nums.length
      const stdDev = Math.sqrt(variance)
      return { results: [{ label: 'Mean', value: mean.toFixed(4) }, { label: 'Std Deviation', value: stdDev.toFixed(4), highlight: true }], formula: { formula: 'σ = √(Σ(x-μ)²/N)', explanation: 'Population standard deviation.' } }
    }
  },
  trigonometry: {
    name: 'Trigonometry Calculator', description: 'Sin, cos, tan', longDescription: 'Calculate trigonometric functions.', category: 'math', icon: Calculator,
    inputs: [{ id: 'angle', label: 'Angle (degrees)', placeholder: '30' }],
    calculate: (inputs) => {
      const angle = parseFloat(inputs.angle)
      if (isNaN(angle)) return { results: [] }
      const rad = angle * Math.PI / 180
      return { results: [{ label: 'sin', value: Math.sin(rad).toFixed(4) }, { label: 'cos', value: Math.cos(rad).toFixed(4) }, { label: 'tan', value: Math.tan(rad).toFixed(4), highlight: true }], formula: { formula: 'Trigonometric functions', explanation: `${angle}° in radians = ${rad.toFixed(4)}` } }
    }
  },
  // NEW DATE/TIME CALCULATORS
  'age-difference': {
    name: 'Age Difference Calculator', description: 'Compare ages', longDescription: 'Calculate age difference between two people.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'birth1', label: 'Birth Date 1', placeholder: '', type: 'date' }, { id: 'birth2', label: 'Birth Date 2', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.birth1 || !inputs.birth2) return { results: [] }
      const b1 = new Date(inputs.birth1), b2 = new Date(inputs.birth2)
      const diff = Math.abs(b1.getTime() - b2.getTime())
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const years = Math.floor(days / 365.25)
      return { results: [{ label: 'Age Difference', value: `${years} years, ${days % 365} days`, highlight: true }], formula: { formula: 'Difference in birth dates', explanation: `${days} total days difference.` } }
    }
  },
  'calendar-generator': {
    name: 'Calendar Generator', description: 'Create calendar', longDescription: 'Generate a monthly calendar.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'month', label: 'Month (1-12)', placeholder: '1' }, { id: 'year', label: 'Year', placeholder: '2026' }],
    calculate: (inputs) => {
      const month = parseInt(inputs.month), year = parseInt(inputs.year)
      if (isNaN(month) || isNaN(year) || month < 1 || month > 12) return { results: [] }
      const firstDay = new Date(year, month - 1, 1).getDay()
      const daysInMonth = new Date(year, month, 0).getDate()
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return { results: [{ label: months[month - 1] + ' ' + year, value: `${daysInMonth} days, starts ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][firstDay]}`, highlight: true }], formula: { formula: 'Calendar calculation', explanation: `${daysInMonth} days in month.` } }
    }
  },
  'date-add-year': {
    name: 'Add Years Calculator', description: 'Year arithmetic', longDescription: 'Add or subtract years from a date.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }, { id: 'years', label: 'Years to Add', placeholder: '5' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const date = new Date(inputs.date), years = parseInt(inputs.years) || 0
      date.setFullYear(date.getFullYear() + years)
      return { results: [{ label: 'Result Date', value: date.toDateString(), highlight: true }], formula: { formula: 'Date + Years', explanation: `${years > 0 ? 'Added' : 'Subtracted'} ${Math.abs(years)} years.` } }
    }
  },
  'date-compare': {
    name: 'Date Compare', description: 'Compare dates', longDescription: 'Compare two dates.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date1', label: 'Date 1', placeholder: '', type: 'date' }, { id: 'date2', label: 'Date 2', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.date1 || !inputs.date2) return { results: [] }
      const d1 = new Date(inputs.date1), d2 = new Date(inputs.date2)
      const diff = d1.getTime() - d2.getTime()
      const days = Math.round(diff / (1000 * 60 * 60 * 24))
      return { results: [{ label: 'Comparison', value: days === 0 ? 'Same day' : days > 0 ? `Date 1 is ${days} days later` : `Date 1 is ${Math.abs(days)} days earlier`, highlight: true }], formula: { formula: 'Date comparison', explanation: 'Comparing two dates.' } }
    }
  },
  'date-fraction': {
    name: 'Date Fraction Calculator', description: 'Decimal dates', longDescription: 'Convert date to decimal year.', category: 'datetime', icon: Clock,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const date = new Date(inputs.date)
      const yearStart = new Date(date.getFullYear(), 0, 1)
      const yearEnd = new Date(date.getFullYear() + 1, 0, 1)
      const fraction = (date.getTime() - yearStart.getTime()) / (yearEnd.getTime() - yearStart.getTime())
      const decimalYear = date.getFullYear() + fraction
      return { results: [{ label: 'Decimal Year', value: decimalYear.toFixed(6), highlight: true }], formula: { formula: 'Year + day fraction', explanation: 'Used in astronomical calculations.' } }
    }
  },
  'holiday-date': {
    name: 'Holiday Date Finder', description: 'Find holidays', longDescription: 'Find date of common holidays.', category: 'datetime', icon: Star,
    inputs: [{ id: 'year', label: 'Year', placeholder: '2026' }, { id: 'holiday', label: 'Holiday', placeholder: '', type: 'select', options: [{ value: 'thanksgiving', label: 'Thanksgiving (US)' }, { value: 'easter', label: 'Easter' }, { value: 'mothers', label: "Mother's Day (US)" }] }],
    calculate: (inputs) => {
      const year = parseInt(inputs.year)
      if (isNaN(year)) return { results: [] }
      let date: Date
      switch (inputs.holiday) {
        case 'thanksgiving': date = new Date(year, 10, 1); date.setDate(22 + (11 - date.getDay()) % 7); break
        case 'easter': const a = year % 19, b = Math.floor(year / 100), c = year % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451), month = Math.floor((h + l - 7 * m + 114) / 31) - 1, day = ((h + l - 7 * m + 114) % 31) + 1; date = new Date(year, month, day); break
        case 'mothers': date = new Date(year, 4, 1); date.setDate(8 - date.getDay() + 7); break
        default: date = new Date()
      }
      return { results: [{ label: 'Holiday Date', value: date.toDateString(), highlight: true }], formula: { formula: 'Holiday calculation', explanation: `${inputs.holiday} ${year}` } }
    }
  },
  'julian-date': {
    name: 'Julian Date Converter', description: 'JD converter', longDescription: 'Convert to Julian Date.', category: 'datetime', icon: Globe,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const date = new Date(inputs.date + 'T12:00:00Z')
      const jd = Math.floor(date.getTime() / 86400000) + 2440588
      return { results: [{ label: 'Julian Date', value: jd, highlight: true }], formula: { formula: 'JD = Unix days + 2440588', explanation: 'Used in astronomy.' } }
    }
  },
  'moon-phase': {
    name: 'Moon Phase Calculator', description: 'Lunar phase', longDescription: 'Calculate current moon phase.', category: 'datetime', icon: Moon,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      const date = inputs.date ? new Date(inputs.date) : new Date()
      const lunarCycle = 29.53058867
      const known = new Date(2000, 0, 6)
      const days = (date.getTime() - known.getTime()) / 86400000
      const phase = ((days % lunarCycle) + lunarCycle) % lunarCycle
      const phases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent']
      const phaseIndex = Math.floor(phase / lunarCycle * 8)
      return { results: [{ label: 'Moon Phase', value: phases[phaseIndex], highlight: true }, { label: 'Day of Cycle', value: Math.floor(phase) + 1 }], formula: { formula: 'Lunar cycle ≈ 29.53 days', explanation: 'Synodic month calculation.' } }
    }
  },
  'pregnancy-weeks': {
    name: 'Pregnancy Weeks Calculator', description: 'Week calculator', longDescription: 'Calculate pregnancy week by date.', category: 'datetime', icon: Heart,
    inputs: [{ id: 'lmp', label: 'Last Menstrual Period', placeholder: '', type: 'date' }, { id: 'checkDate', label: 'Check Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.lmp) return { results: [] }
      const lmp = new Date(inputs.lmp), check = inputs.checkDate ? new Date(inputs.checkDate) : new Date()
      const days = Math.floor((check.getTime() - lmp.getTime()) / 86400000)
      const weeks = Math.floor(days / 7), remainingDays = days % 7
      return { results: [{ label: 'Pregnancy Week', value: `${weeks}w ${remainingDays}d`, highlight: true }, { label: 'Trimester', value: weeks < 13 ? '1st' : weeks < 27 ? '2nd' : '3rd' }], formula: { formula: 'Days since LMP / 7', explanation: `Day ${days} of pregnancy.` } }
    }
  },
  'school-year': {
    name: 'School Year Calculator', description: 'Academic year', longDescription: 'Calculate school year grade.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'birthYear', label: 'Birth Year', placeholder: '2010' }, { id: 'schoolYear', label: 'School Year Start', placeholder: '2026' }],
    calculate: (inputs) => {
      const birth = parseInt(inputs.birthYear), school = parseInt(inputs.schoolYear)
      if (!birth || !school) return { results: [] }
      const age = school - birth
      const grades = ['Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade', '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade']
      const grade = age - 5
      return { results: [{ label: 'Grade', value: grade >= 0 && grade < grades.length ? grades[grade] : 'Out of range', highlight: true }], formula: { formula: 'Grade = School Year - Birth Year - 5', explanation: `Age ${age} at school start.` } }
    }
  },
  'sidereal-time': {
    name: 'Sidereal Time Calculator', description: 'Star time', longDescription: 'Calculate local sidereal time.', category: 'datetime', icon: Globe,
    inputs: [{ id: 'longitude', label: 'Longitude', placeholder: '-74' }],
    calculate: (inputs) => {
      const lon = parseFloat(inputs.longitude)
      if (isNaN(lon)) return { results: [] }
      const now = new Date(), jd = Math.floor(now.getTime() / 86400000) + 2440588, T = (jd - 2451545.0) / 36525
      let gst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T
      gst = ((gst % 360) + 360) % 360
      const lst = ((gst + lon) % 360 + 360) % 360
      const hours = Math.floor(lst / 15), mins = Math.floor((lst / 15 - hours) * 60)
      return { results: [{ label: 'Local Sidereal Time', value: `${hours}h ${mins}m`, highlight: true }], formula: { formula: 'LST = GST + longitude', explanation: 'Used in astronomy for star positions.' } }
    }
  },
  'sun-position': {
    name: 'Sun Position Calculator', description: 'Sun angle', longDescription: 'Calculate sun position.', category: 'datetime', icon: Sun,
    inputs: [{ id: 'lat', label: 'Latitude', placeholder: '40.7' }, { id: 'hour', label: 'Hour (0-23)', placeholder: '12' }, { id: 'day', label: 'Day of Year', placeholder: '172' }],
    calculate: (inputs) => {
      const lat = parseFloat(inputs.lat), hour = parseFloat(inputs.hour), day = parseFloat(inputs.day)
      if (isNaN(lat) || isNaN(hour) || isNaN(day)) return { results: [] }
      const declination = -23.45 * Math.cos((360 / 365) * (day + 10) * Math.PI / 180)
      const hourAngle = (hour - 12) * 15
      const altitude = Math.asin(Math.sin(lat * Math.PI / 180) * Math.sin(declination * Math.PI / 180) + Math.cos(lat * Math.PI / 180) * Math.cos(declination * Math.PI / 180) * Math.cos(hourAngle * Math.PI / 180)) * 180 / Math.PI
      return { results: [{ label: 'Sun Altitude', value: `${altitude.toFixed(1)}°`, highlight: true }], formula: { formula: 'Solar position equations', explanation: `Angle above horizon at ${hour}:00.` } }
    }
  },
  // NEW TOOLS CALCULATORS
  base64: {
    name: 'Base64 Encoder/Decoder', description: 'Encode/decode', longDescription: 'Encode or decode Base64 strings.', category: 'tools', icon: FileText,
    inputs: [{ id: 'text', label: 'Text', placeholder: 'Hello World' }, { id: 'mode', label: 'Mode', placeholder: '', type: 'select', options: [{ value: 'encode', label: 'Encode' }, { value: 'decode', label: 'Decode' }] }],
    calculate: (inputs) => {
      try {
        const result = inputs.mode === 'decode' ? atob(inputs.text) : btoa(inputs.text)
        return { results: [{ label: inputs.mode === 'decode' ? 'Decoded' : 'Encoded', value: result, highlight: true }], formula: { formula: 'Base64 conversion', explanation: 'Standard Base64 encoding.' } }
      } catch { return { results: [{ label: 'Error', value: 'Invalid input' }] } }
    }
  },
  'bmi-for-age': {
    name: 'BMI for Age Calculator', description: 'Child BMI', longDescription: 'Calculate BMI percentile for children.', category: 'tools', icon: Activity,
    inputs: [{ id: 'age', label: 'Age (years)', placeholder: '10' }, { id: 'gender', label: 'Gender', placeholder: '', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }, { id: 'weight', label: 'Weight (kg)', placeholder: '35' }, { id: 'height', label: 'Height (cm)', placeholder: '140' }],
    calculate: (inputs) => {
      const age = parseFloat(inputs.age), w = parseFloat(inputs.weight), h = parseFloat(inputs.height)
      if (!age || !w || !h) return { results: [] }
      const bmi = w / Math.pow(h / 100, 2)
      let percentile = 50 + (bmi - 18) * 5
      percentile = Math.max(5, Math.min(95, percentile))
      return { results: [{ label: 'BMI', value: bmi.toFixed(1) }, { label: 'Percentile (approx)', value: `${percentile.toFixed(0)}th`, highlight: true }], formula: { formula: 'BMI = Weight / Height²', explanation: 'Percentile indicates relative position.' } }
    }
  },
  'clothing-size': {
    name: 'Clothing Size Converter', description: 'Size converter', longDescription: 'Convert clothing sizes between regions.', category: 'tools', icon: Ruler,
    inputs: [{ id: 'size', label: 'US Size', placeholder: '10' }, { id: 'type', label: 'Type', placeholder: '', type: 'select', options: [{ value: 'dress', label: 'Dress' }, { value: 'shoe-w', label: 'Shoes (Women)' }, { value: 'shoe-m', label: 'Shoes (Men)' }] }],
    calculate: (inputs) => {
      const us = parseInt(inputs.size)
      if (isNaN(us)) return { results: [] }
      let eu: number, uk: number
      switch (inputs.type) {
        case 'dress': eu = us + 32; uk = us - 2; break
        case 'shoe-w': eu = us + 33; uk = us - 2; break
        case 'shoe-m': eu = us + 33; uk = us - 1; break
        default: eu = 0; uk = 0
      }
      return { results: [{ label: 'EU Size', value: eu, highlight: true }, { label: 'UK Size', value: uk }], formula: { formula: 'Size conversion chart', explanation: 'Approximate conversion.' } }
    }
  },
  density: {
    name: 'Density Converter', description: 'Mass/volume', longDescription: 'Convert density units.', category: 'tools', icon: Weight,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'kgm3', label: 'kg/m³' }, { value: 'gcm3', label: 'g/cm³' }, { value: 'lbft3', label: 'lb/ft³' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'kgm3', label: 'kg/m³' }, { value: 'gcm3', label: 'g/cm³' }, { value: 'lbft3', label: 'lb/ft³' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toKgm3: Record<string, number> = { kgm3: 1, gcm3: 1000, lbft3: 16.0185 }
      const kgm3 = value * toKgm3[inputs.from || 'kgm3'], result = kgm3 / toKgm3[inputs.to || 'kgm3']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Density conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  force: {
    name: 'Force Converter', description: 'Force units', longDescription: 'Convert force units.', category: 'tools', icon: Zap,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'n', label: 'Newtons' }, { value: 'lbf', label: 'Pound-force' }, { value: 'kgf', label: 'Kilogram-force' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'n', label: 'Newtons' }, { value: 'lbf', label: 'Pound-force' }, { value: 'kgf', label: 'Kilogram-force' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toN: Record<string, number> = { n: 1, lbf: 4.44822, kgf: 9.80665 }
      const n = value * toN[inputs.from || 'n'], result = n / toN[inputs.to || 'n']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Force conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  illuminance: {
    name: 'Illuminance Converter', description: 'Light units', longDescription: 'Convert illuminance units.', category: 'tools', icon: Sun,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1000' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'lux', label: 'Lux' }, { value: 'fc', label: 'Foot-candle' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'lux', label: 'Lux' }, { value: 'fc', label: 'Foot-candle' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toLux: Record<string, number> = { lux: 1, fc: 10.764 }
      const lux = value * toLux[inputs.from || 'lux'], result = lux / toLux[inputs.to || 'lux']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Illuminance conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  luminance: {
    name: 'Luminance Converter', description: 'Brightness', longDescription: 'Convert luminance units.', category: 'tools', icon: Sun,
    inputs: [{ id: 'value', label: 'Value', placeholder: '100' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'cdm2', label: 'cd/m²' }, { value: 'nt', label: 'Nit' }, { value: 'sb', label: 'Stilb' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'cdm2', label: 'cd/m²' }, { value: 'nt', label: 'Nit' }, { value: 'sb', label: 'Stilb' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toCdm2: Record<string, number> = { cdm2: 1, nt: 1, sb: 10000 }
      const cdm2 = value * toCdm2[inputs.from || 'cdm2'], result = cdm2 / toCdm2[inputs.to || 'cdm2']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Luminance conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  'magnetic-field': {
    name: 'Magnetic Field Converter', description: 'Field strength', longDescription: 'Convert magnetic field units.', category: 'tools', icon: Target,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 't', label: 'Tesla' }, { value: 'g', label: 'Gauss' }, { value: 'mt', label: 'mT' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 't', label: 'Tesla' }, { value: 'g', label: 'Gauss' }, { value: 'mt', label: 'mT' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toT: Record<string, number> = { t: 1, g: 0.0001, mt: 0.001 }
      const t = value * toT[inputs.from || 't'], result = t / toT[inputs.to || 't']
      return { results: [{ label: 'Result', value: result.toFixed(6), unit: inputs.to, highlight: true }], formula: { formula: 'Magnetic field conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(6)} ${inputs.to}` } }
    }
  },
  power: {
    name: 'Power Converter', description: 'Power units', longDescription: 'Convert power units.', category: 'tools', icon: Zap,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'w', label: 'Watts' }, { value: 'kw', label: 'Kilowatts' }, { value: 'hp', label: 'Horsepower' }, { value: 'btuh', label: 'BTU/hr' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'w', label: 'Watts' }, { value: 'kw', label: 'Kilowatts' }, { value: 'hp', label: 'Horsepower' }, { value: 'btuh', label: 'BTU/hr' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toW: Record<string, number> = { w: 1, kw: 1000, hp: 745.7, btuh: 0.2931 }
      const w = value * toW[inputs.from || 'w'], result = w / toW[inputs.to || 'w']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Power conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  torque: {
    name: 'Torque Converter', description: 'Rotation force', longDescription: 'Convert torque units.', category: 'tools', icon: Wrench,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'nm', label: 'N·m' }, { value: 'lbft', label: 'lb·ft' }, { value: 'kgcm', label: 'kg·cm' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'nm', label: 'N·m' }, { value: 'lbft', label: 'lb·ft' }, { value: 'kgcm', label: 'kg·cm' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toNm: Record<string, number> = { nm: 1, lbft: 1.3558, kgcm: 0.09807 }
      const nm = value * toNm[inputs.from || 'nm'], result = nm / toNm[inputs.to || 'nm']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Torque conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  viscosity: {
    name: 'Viscosity Converter', description: 'Fluid thickness', longDescription: 'Convert viscosity units.', category: 'tools', icon: Droplets,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'pas', label: 'Pa·s' }, { value: 'cp', label: 'cP' }, { value: 'poise', label: 'Poise' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'pas', label: 'Pa·s' }, { value: 'cp', label: 'cP' }, { value: 'poise', label: 'Poise' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toPas: Record<string, number> = { pas: 1, cp: 0.001, poise: 0.1 }
      const pas = value * toPas[inputs.from || 'pas'], result = pas / toPas[inputs.to || 'pas']
      return { results: [{ label: 'Result', value: result.toFixed(6), unit: inputs.to, highlight: true }], formula: { formula: 'Viscosity conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(6)} ${inputs.to}` } }
    }
  },
  voltage: {
    name: 'Voltage Converter', description: 'Electric potential', longDescription: 'Convert voltage units.', category: 'tools', icon: Zap,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'v', label: 'Volts' }, { value: 'mv', label: 'Millivolts' }, { value: 'kv', label: 'Kilovolts' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'v', label: 'Volts' }, { value: 'mv', label: 'Millivolts' }, { value: 'kv', label: 'Kilovolts' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toV: Record<string, number> = { v: 1, mv: 0.001, kv: 1000 }
      const v = value * toV[inputs.from || 'v'], result = v / toV[inputs.to || 'v']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Voltage conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  // NEW HEALTH CALCULATORS
  'allergy-risk': {
    name: 'Allergy Risk Calculator', description: 'Allergy assessment', longDescription: 'Assess your potential allergy risk based on family history and symptoms.', category: 'health', icon: Shield,
    inputs: [{ id: 'family', label: 'Family History', placeholder: '', type: 'select', options: [{ value: '0', label: 'None' }, { value: '1', label: 'One parent' }, { value: '2', label: 'Both parents' }] }, { id: 'symptoms', label: 'Symptom Score (1-10)', placeholder: '5' }],
    calculate: (inputs) => {
      const family = parseFloat(inputs.family || '0'), symptoms = parseFloat(inputs.symptoms || '5')
      const risk = (family * 25) + (symptoms * 7.5)
      let level: string, color: string
      if (risk < 25) { level = 'Low Risk'; color = '#22c55e' }
      else if (risk < 50) { level = 'Moderate Risk'; color = '#f59e0b' }
      else { level = 'High Risk'; color = '#ef4444' }
      return { results: [{ label: 'Risk Level', value: level, highlight: true }, { label: 'Risk Score', value: risk.toFixed(0), unit: '%' }], pieData: [{ label: 'Risk', value: risk, color }, { label: 'Safe', value: 100 - risk, color: '#e5e7eb' }], formula: { formula: 'Risk = (Family × 25) + (Symptoms × 7.5)', explanation: 'Based on family history and symptom severity.' } }
    }
  },
  'blood-pressure': {
    name: 'Blood Pressure Calculator', description: 'BP category', longDescription: 'Determine your blood pressure category based on systolic and diastolic readings.', category: 'health', icon: Heart,
    inputs: [{ id: 'systolic', label: 'Systolic (mmHg)', placeholder: '120' }, { id: 'diastolic', label: 'Diastolic (mmHg)', placeholder: '80' }],
    calculate: (inputs) => {
      const sys = parseFloat(inputs.systolic), dia = parseFloat(inputs.diastolic)
      if (!sys || !dia) return { results: [] }
      let category: string, color: string
      if (sys < 120 && dia < 80) { category = 'Normal'; color = '#22c55e' }
      else if (sys < 130 && dia < 80) { category = 'Elevated'; color = '#84cc16' }
      else if (sys < 140 || dia < 90) { category = 'High BP Stage 1'; color = '#f59e0b' }
      else if (sys >= 140 || dia >= 90) { category = 'High BP Stage 2'; color = '#ef4444' }
      else { category = 'Hypertensive Crisis'; color = '#dc2626' }
      return { results: [{ label: 'BP Reading', value: `${sys}/${dia}`, unit: 'mmHg', highlight: true }, { label: 'Category', value: category }], formula: { formula: 'BP = Systolic/Diastolic', explanation: `Your blood pressure is ${category}.` } }
    }
  },
  'body-adiposity': {
    name: 'Body Adiposity Index', description: 'BAI calculator', longDescription: 'Calculate Body Adiposity Index, an alternative to BMI for estimating body fat.', category: 'health', icon: Percent,
    inputs: [{ id: 'hip', label: 'Hip Circumference (cm)', placeholder: '100' }, { id: 'height', label: 'Height (cm)', placeholder: '175' }],
    calculate: (inputs) => {
      const hip = parseFloat(inputs.hip), height = parseFloat(inputs.height)
      if (!hip || !height) return { results: [] }
      const bai = (hip / Math.pow(height, 1.5)) - 18
      return { results: [{ label: 'BAI', value: bai.toFixed(1), unit: '%', highlight: true }, { label: 'Body Fat Estimate', value: bai.toFixed(1), unit: '%' }], formula: { formula: 'BAI = (Hip / Height^1.5) - 18', explanation: 'Body Adiposity Index estimates body fat percentage.' } }
    }
  },
  'bone-density': {
    name: 'Bone Density Calculator', description: 'T-score estimator', longDescription: 'Estimate bone density T-score category for osteoporosis screening.', category: 'health', icon: Ruler,
    inputs: [{ id: 'tscore', label: 'T-Score', placeholder: '-1.0' }],
    calculate: (inputs) => {
      const t = parseFloat(inputs.tscore)
      if (isNaN(t)) return { results: [] }
      let category: string, color: string
      if (t >= -1) { category = 'Normal'; color = '#22c55e' }
      else if (t > -2.5) { category = 'Osteopenia'; color = '#f59e0b' }
      else { category = 'Osteoporosis'; color = '#ef4444' }
      return { results: [{ label: 'T-Score', value: t.toFixed(1), highlight: true }, { label: 'Category', value: category }], formula: { formula: 'T-Score Interpretation', explanation: `T-score of ${t} indicates ${category}.` } }
    }
  },
  'calorie-deficit': {
    name: 'Calorie Deficit Calculator', description: 'Weight loss rate', longDescription: 'Calculate how much weight you can lose with a calorie deficit.', category: 'health', icon: TrendingDown,
    inputs: [{ id: 'deficit', label: 'Daily Deficit (calories)', placeholder: '500' }],
    calculate: (inputs) => {
      const deficit = parseFloat(inputs.deficit)
      if (!deficit) return { results: [] }
      const weeklyLoss = (deficit * 7) / 3500, monthlyLoss = weeklyLoss * 4.3
      return { results: [{ label: 'Weekly Loss', value: weeklyLoss.toFixed(2), unit: 'lbs', highlight: true }, { label: 'Monthly Loss', value: monthlyLoss.toFixed(1), unit: 'lbs' }], formula: { formula: '1 lb fat ≈ 3500 calories', explanation: `A ${deficit} calorie daily deficit results in ${weeklyLoss.toFixed(2)} lbs/week loss.` } }
    }
  },
  'cardio-risk': {
    name: 'Cardiovascular Risk Calculator', description: 'Heart disease risk', longDescription: 'Estimate your 10-year cardiovascular disease risk.', category: 'health', icon: Heart,
    inputs: [{ id: 'age', label: 'Age', placeholder: '45' }, { id: 'cholesterol', label: 'Total Cholesterol', placeholder: '200' }, { id: 'smoking', label: 'Smoker', placeholder: '', type: 'select', options: [{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }] }],
    calculate: (inputs) => {
      const age = parseFloat(inputs.age), chol = parseFloat(inputs.cholesterol), smoke = parseFloat(inputs.smoking || '0')
      if (!age || !chol) return { results: [] }
      let risk = (age - 20) * 0.5 + (chol - 150) * 0.1 + smoke * 5
      risk = Math.max(1, Math.min(50, risk))
      return { results: [{ label: '10-Year Risk', value: risk.toFixed(1), unit: '%', highlight: true }], pieData: [{ label: 'Risk', value: risk, color: '#ef4444' }, { label: 'Safe', value: 100 - risk, color: '#22c55e' }], formula: { formula: 'Risk estimation algorithm', explanation: 'Based on age, cholesterol, and smoking status.' } }
    }
  },
  'cholesterol': {
    name: 'Cholesterol Calculator', description: 'Lipid profile', longDescription: 'Calculate your total cholesterol to HDL ratio.', category: 'health', icon: Activity,
    inputs: [{ id: 'total', label: 'Total Cholesterol (mg/dL)', placeholder: '200' }, { id: 'hdl', label: 'HDL (mg/dL)', placeholder: '50' }],
    calculate: (inputs) => {
      const total = parseFloat(inputs.total), hdl = parseFloat(inputs.hdl)
      if (!total || !hdl) return { results: [] }
      const ratio = total / hdl
      let category: string
      if (ratio < 3.5) category = 'Optimal'
      else if (ratio < 5) category = 'Normal'
      else category = 'High Risk'
      return { results: [{ label: 'Total/HDL Ratio', value: ratio.toFixed(2), highlight: true }, { label: 'Category', value: category }], formula: { formula: 'Ratio = Total Cholesterol / HDL', explanation: `A ratio of ${ratio.toFixed(2)} is considered ${category}.` } }
    }
  },
  'daily-steps': {
    name: 'Daily Steps Calculator', description: 'Step goal calc', longDescription: 'Calculate calories burned and distance from daily steps.', category: 'health', icon: Timer,
    inputs: [{ id: 'steps', label: 'Number of Steps', placeholder: '10000' }, { id: 'stride', label: 'Stride Length (inches)', placeholder: '30' }],
    calculate: (inputs) => {
      const steps = parseFloat(inputs.steps), stride = parseFloat(inputs.stride || '30')
      if (!steps) return { results: [] }
      const distanceMiles = (steps * stride) / 63360, calories = steps * 0.04
      return { results: [{ label: 'Distance', value: distanceMiles.toFixed(2), unit: 'miles', highlight: true }, { label: 'Calories Burned', value: Math.round(calories) }], formula: { formula: 'Distance = Steps × Stride', explanation: `${steps.toLocaleString()} steps = ${distanceMiles.toFixed(2)} miles.` } }
    }
  },
  'diabetes-risk': {
    name: 'Diabetes Risk Calculator', description: 'Risk assessment', longDescription: 'Assess your risk for Type 2 Diabetes.', category: 'health', icon: AlertCircle,
    inputs: [{ id: 'age', label: 'Age', placeholder: '45' }, { id: 'bmi', label: 'BMI', placeholder: '25' }, { id: 'activity', label: 'Physically Active', placeholder: '', type: 'select', options: [{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }] }],
    calculate: (inputs) => {
      const age = parseFloat(inputs.age), bmi = parseFloat(inputs.bmi), active = parseFloat(inputs.activity || '1')
      if (!age || !bmi) return { results: [] }
      let risk = (age / 10) + (bmi / 5) - (active * 3)
      risk = Math.max(5, Math.min(80, risk))
      return { results: [{ label: 'Diabetes Risk', value: risk.toFixed(1), unit: '%', highlight: true }], pieData: [{ label: 'Risk', value: risk, color: '#f59e0b' }, { label: 'Low Risk', value: 100 - risk, color: '#22c55e' }], formula: { formula: 'Risk assessment model', explanation: 'Based on age, BMI, and activity level.' } }
    }
  },
  'hydration': {
    name: 'Hydration Calculator', description: 'Water status', longDescription: 'Calculate your hydration needs based on activity and weight.', category: 'health', icon: Droplets,
    inputs: [{ id: 'weight', label: 'Weight (kg)', placeholder: '70' }, { id: 'activity', label: 'Activity Level', placeholder: '', type: 'select', options: [{ value: '1', label: 'Sedentary' }, { value: '1.2', label: 'Moderate' }, { value: '1.5', label: 'Active' }] }],
    calculate: (inputs) => {
      const weight = parseFloat(inputs.weight), activity = parseFloat(inputs.activity || '1')
      if (!weight) return { results: [] }
      const base = weight * 30, total = base * activity
      return { results: [{ label: 'Daily Water', value: Math.round(total), unit: 'ml', highlight: true }, { label: 'Glasses (8oz)', value: (total / 240).toFixed(1) }], formula: { formula: 'Water = Weight × 30ml × Activity', explanation: `${Math.round(total)}ml of water recommended daily.` } }
    }
  },
  'metabolism-type': {
    name: 'Metabolism Type Calculator', description: 'Metabolic type', longDescription: 'Determine your metabolic type based on eating habits.', category: 'health', icon: Zap,
    inputs: [{ id: 'meals', label: 'Meals per day', placeholder: '', type: 'select', options: [{ value: '2', label: '2 meals' }, { value: '3', label: '3 meals' }, { value: '5', label: '5+ small meals' }] }, { id: 'energy', label: 'Energy Level', placeholder: '', type: 'select', options: [{ value: 'low', label: 'Low' }, { value: 'medium', label: 'Medium' }, { value: 'high', label: 'High' }] }],
    calculate: (inputs) => {
      const type = inputs.meals === '5' ? 'Fast Metabolism' : inputs.meals === '2' ? 'Slow Metabolism' : 'Normal Metabolism'
      return { results: [{ label: 'Metabolism Type', value: type, highlight: true }, { label: 'Recommendation', value: inputs.energy === 'low' ? 'Consider more frequent meals' : 'Maintain current routine' }], formula: { formula: 'Metabolic assessment', explanation: `Based on meal frequency and energy levels.` } }
    }
  },
  'muscle-gain': {
    name: 'Muscle Gain Calculator', description: 'Muscle building', longDescription: 'Calculate potential muscle gain and protein requirements.', category: 'health', icon: Award,
    inputs: [{ id: 'weight', label: 'Current Weight (kg)', placeholder: '70' }, { id: 'experience', label: 'Training Experience', placeholder: '', type: 'select', options: [{ value: '1', label: 'Beginner' }, { value: '0.5', label: 'Intermediate' }, { value: '0.25', label: 'Advanced' }] }],
    calculate: (inputs) => {
      const weight = parseFloat(inputs.weight), exp = parseFloat(inputs.experience || '1')
      if (!weight) return { results: [] }
      const monthlyGain = weight * 0.02 * exp, protein = weight * 2
      return { results: [{ label: 'Monthly Muscle Gain', value: monthlyGain.toFixed(2), unit: 'kg', highlight: true }, { label: 'Daily Protein', value: Math.round(protein), unit: 'g' }], formula: { formula: 'Gain = Weight × 2% × Experience Factor', explanation: `Potential ${monthlyGain.toFixed(2)}kg muscle gain per month.` } }
    }
  },
  'nutrition-score': {
    name: 'Nutrition Score Calculator', description: 'Diet quality', longDescription: 'Calculate your nutrition score based on diet habits.', category: 'health', icon: Target,
    inputs: [{ id: 'vegetables', label: 'Vegetable servings/day', placeholder: '3' }, { id: 'processed', label: 'Processed food meals/week', placeholder: '3' }, { id: 'water', label: 'Water glasses/day', placeholder: '8' }],
    calculate: (inputs) => {
      const veg = parseFloat(inputs.vegetables || '0'), proc = parseFloat(inputs.processed || '7'), water = parseFloat(inputs.water || '0')
      const score = Math.min(100, Math.max(0, (veg * 10) + (water * 3) - (proc * 3) + 30))
      let grade: string
      if (score >= 80) grade = 'Excellent'
      else if (score >= 60) grade = 'Good'
      else if (score >= 40) grade = 'Fair'
      else grade = 'Needs Improvement'
      return { results: [{ label: 'Nutrition Score', value: Math.round(score), unit: '/100', highlight: true }, { label: 'Grade', value: grade }], pieData: [{ label: 'Score', value: score, color: '#22c55e' }, { label: 'Gap', value: 100 - score, color: '#e5e7eb' }], formula: { formula: 'Score = (Veg × 10) + (Water × 3) - (Processed × 3) + 30', explanation: `Your nutrition score is ${Math.round(score)}.` } }
    }
  },
  'stress-level': {
    name: 'Stress Level Calculator', description: 'Stress assessment', longDescription: 'Assess your current stress level based on symptoms.', category: 'health', icon: Brain,
    inputs: [{ id: 'sleep', label: 'Sleep quality (1-10)', placeholder: '7' }, { id: 'mood', label: 'Mood stability (1-10)', placeholder: '6' }, { id: 'anxiety', label: 'Anxiety level (1-10)', placeholder: '4' }],
    calculate: (inputs) => {
      const sleep = parseFloat(inputs.sleep || '5'), mood = parseFloat(inputs.mood || '5'), anxiety = parseFloat(inputs.anxiety || '5')
      const stress = 100 - ((sleep + mood + (10 - anxiety)) / 3 * 10)
      let level: string, color: string
      if (stress < 30) { level = 'Low Stress'; color = '#22c55e' }
      else if (stress < 60) { level = 'Moderate Stress'; color = '#f59e0b' }
      else { level = 'High Stress'; color = '#ef4444' }
      return { results: [{ label: 'Stress Level', value: level, highlight: true }, { label: 'Stress Score', value: stress.toFixed(0), unit: '%' }], pieData: [{ label: 'Stress', value: stress, color }, { label: 'Wellness', value: 100 - stress, color: '#22c55e' }], formula: { formula: 'Stress = 100 - ((Sleep + Mood + (10-Anxiety)) / 3 × 10)', explanation: `Your stress score is ${stress.toFixed(0)}%.` } }
    }
  },
  // NEW FINANCIAL CALCULATORS
  'annuity': {
    name: 'Annuity Calculator', description: 'Payment stream', longDescription: 'Calculate annuity payments for future income planning.', category: 'financial', icon: DollarSign,
    inputs: [{ id: 'principal', label: 'Principal ($)', placeholder: '100000' }, { id: 'rate', label: 'Annual Rate (%)', placeholder: '5' }, { id: 'years', label: 'Years', placeholder: '20' }],
    calculate: (inputs) => {
      const p = parseFloat(inputs.principal), r = parseFloat(inputs.rate) / 100 / 12, n = parseFloat(inputs.years) * 12
      if (!p || !r || !n) return { results: [] }
      const payment = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      return { results: [{ label: 'Monthly Payment', value: `$${Math.round(payment).toLocaleString()}`, highlight: true }, { label: 'Annual Payment', value: `$${Math.round(payment * 12).toLocaleString()}` }], formula: { formula: 'PMT = P × [r(1+r)^n] / [(1+r)^n - 1]', explanation: `Monthly annuity payment for ${inputs.years} years.` } }
    }
  },
  'asset-allocation': {
    name: 'Asset Allocation Calculator', description: 'Portfolio mix', longDescription: 'Determine optimal asset allocation based on risk tolerance.', category: 'financial', icon: PieChartIcon,
    inputs: [{ id: 'age', label: 'Age', placeholder: '35' }, { id: 'risk', label: 'Risk Tolerance', placeholder: '', type: 'select', options: [{ value: 'conservative', label: 'Conservative' }, { value: 'moderate', label: 'Moderate' }, { value: 'aggressive', label: 'Aggressive' }] }],
    calculate: (inputs) => {
      const age = parseFloat(inputs.age), risk = inputs.risk || 'moderate'
      let stocks = risk === 'aggressive' ? 100 - age : risk === 'conservative' ? 60 - age : 80 - age
      stocks = Math.max(20, Math.min(90, stocks))
      const bonds = 100 - stocks
      return { results: [{ label: 'Stocks', value: stocks, unit: '%', highlight: true }, { label: 'Bonds', value: bonds, unit: '%' }], pieData: [{ label: 'Stocks', value: stocks, color: '#3b82f6' }, { label: 'Bonds', value: bonds, color: '#22c55e' }], formula: { formula: 'Rule of thumb: Stocks = 100 - Age (adjusted for risk)', explanation: `Suggested allocation: ${stocks}% stocks, ${bonds}% bonds.` } }
    }
  },
  'budget': {
    name: 'Budget Calculator', description: 'Monthly budget', longDescription: 'Calculate a recommended budget breakdown based on income.', category: 'financial', icon: Wallet,
    inputs: [{ id: 'income', label: 'Monthly Income ($)', placeholder: '5000' }],
    calculate: (inputs) => {
      const income = parseFloat(inputs.income)
      if (!income) return { results: [] }
      const needs = income * 0.5, wants = income * 0.3, savings = income * 0.2
      return { results: [{ label: 'Needs (50%)', value: `$${Math.round(needs).toLocaleString()}` }, { label: 'Wants (30%)', value: `$${Math.round(wants).toLocaleString()}` }, { label: 'Savings (20%)', value: `$${Math.round(savings).toLocaleString()}`, highlight: true }], pieData: [{ label: 'Needs', value: needs, color: '#3b82f6' }, { label: 'Wants', value: wants, color: '#f59e0b' }, { label: 'Savings', value: savings, color: '#22c55e' }], formula: { formula: '50/30/20 Rule', explanation: 'Needs 50%, Wants 30%, Savings 20%.' } }
    }
  },
  'car-afford': {
    name: 'Car Affordability Calculator', description: 'What you can afford', longDescription: 'Calculate how much car you can afford based on income.', category: 'financial', icon: Car,
    inputs: [{ id: 'income', label: 'Annual Income ($)', placeholder: '60000' }, { id: 'down', label: 'Down Payment ($)', placeholder: '5000' }],
    calculate: (inputs) => {
      const income = parseFloat(inputs.income), down = parseFloat(inputs.down) || 0
      if (!income) return { results: [] }
      const maxPrice = income * 0.35 + down
      return { results: [{ label: 'Max Car Price', value: `$${Math.round(maxPrice).toLocaleString()}`, highlight: true }, { label: 'Monthly Payment Est.', value: `$${Math.round((maxPrice - down) / 60).toLocaleString()}` }], formula: { formula: 'Max Price = Income × 35% + Down Payment', explanation: 'Recommended maximum car price based on income.' } }
    }
  },
  'college-savings': {
    name: 'College Savings Calculator', description: 'Education fund', longDescription: 'Calculate monthly savings needed for college education.', category: 'financial', icon: PiggyBank,
    inputs: [{ id: 'years', label: 'Years Until College', placeholder: '10' }, { id: 'goal', label: 'Savings Goal ($)', placeholder: '100000' }, { id: 'rate', label: 'Expected Return (%)', placeholder: '6' }],
    calculate: (inputs) => {
      const years = parseFloat(inputs.years), goal = parseFloat(inputs.goal), rate = parseFloat(inputs.rate) / 100 / 12
      if (!years || !goal) return { results: [] }
      const months = years * 12
      const monthly = rate > 0 ? goal * rate / (Math.pow(1 + rate, months) - 1) : goal / months
      return { results: [{ label: 'Monthly Savings', value: `$${Math.round(monthly).toLocaleString()}`, highlight: true }, { label: 'Total Contributions', value: `$${Math.round(monthly * months).toLocaleString()}` }], formula: { formula: 'PMT = FV × r / ((1+r)^n - 1)', explanation: `Save $${Math.round(monthly).toLocaleString()}/month for ${years} years.` } }
    }
  },
  'commission': {
    name: 'Commission Calculator', description: 'Sales commission', longDescription: 'Calculate commission earnings from sales.', category: 'financial', icon: DollarSign,
    inputs: [{ id: 'sales', label: 'Total Sales ($)', placeholder: '50000' }, { id: 'rate', label: 'Commission Rate (%)', placeholder: '5' }],
    calculate: (inputs) => {
      const sales = parseFloat(inputs.sales), rate = parseFloat(inputs.rate)
      if (!sales || !rate) return { results: [] }
      const commission = sales * rate / 100
      return { results: [{ label: 'Commission Earned', value: `$${Math.round(commission).toLocaleString()}`, highlight: true }], formula: { formula: 'Commission = Sales × Rate%', explanation: `${rate}% commission on $${sales.toLocaleString()} sales.` } }
    }
  },
  'compound-frequency': {
    name: 'Compound Frequency Calculator', description: 'Compare rates', longDescription: 'Compare how compound frequency affects returns.', category: 'financial', icon: Percent,
    inputs: [{ id: 'principal', label: 'Principal ($)', placeholder: '10000' }, { id: 'rate', label: 'Annual Rate (%)', placeholder: '7' }, { id: 'years', label: 'Years', placeholder: '10' }],
    calculate: (inputs) => {
      const p = parseFloat(inputs.principal), r = parseFloat(inputs.rate) / 100, t = parseFloat(inputs.years)
      if (!p || !r || !t) return { results: [] }
      const annual = p * Math.pow(1 + r, t)
      const monthly = p * Math.pow(1 + r / 12, t * 12)
      const daily = p * Math.pow(1 + r / 365, t * 365)
      return { results: [{ label: 'Annual', value: `$${Math.round(annual).toLocaleString()}` }, { label: 'Monthly', value: `$${Math.round(monthly).toLocaleString()}` }, { label: 'Daily', value: `$${Math.round(daily).toLocaleString()}`, highlight: true }], formula: { formula: 'A = P(1 + r/n)^(nt)', explanation: 'More frequent compounding yields higher returns.' } }
    }
  },
  'cost-of-living': {
    name: 'Cost of Living Calculator', description: 'City comparison', longDescription: 'Compare cost of living between two cities.', category: 'financial', icon: Home,
    inputs: [{ id: 'salary', label: 'Current Salary ($)', placeholder: '75000' }, { id: 'index1', label: 'Current City Index', placeholder: '100' }, { id: 'index2', label: 'New City Index', placeholder: '130' }],
    calculate: (inputs) => {
      const salary = parseFloat(inputs.salary), idx1 = parseFloat(inputs.index1), idx2 = parseFloat(inputs.index2)
      if (!salary || !idx1 || !idx2) return { results: [] }
      const equivalent = salary * (idx2 / idx1)
      const difference = equivalent - salary
      return { results: [{ label: 'Equivalent Salary', value: `$${Math.round(equivalent).toLocaleString()}`, highlight: true }, { label: 'Difference', value: `$${Math.round(difference).toLocaleString()}` }], formula: { formula: 'Equivalent = Salary × (New Index / Current Index)', explanation: `You need $${Math.round(equivalent).toLocaleString()} to maintain lifestyle.` } }
    }
  },
  'early-payoff': {
    name: 'Early Payoff Calculator', description: 'Extra payments', longDescription: 'Calculate savings from making extra loan payments.', category: 'financial', icon: CreditCard,
    inputs: [{ id: 'balance', label: 'Loan Balance ($)', placeholder: '200000' }, { id: 'rate', label: 'Interest Rate (%)', placeholder: '6' }, { id: 'extra', label: 'Extra Monthly Payment ($)', placeholder: '200' }],
    calculate: (inputs) => {
      const balance = parseFloat(inputs.balance), rate = parseFloat(inputs.rate) / 100 / 12, extra = parseFloat(inputs.extra) || 0
      if (!balance || !rate || !extra) return { results: [] }
      const basePayment = balance * rate * 1.2, newPayment = basePayment + extra
      const monthsSaved = Math.round(balance / extra * 0.3), interestSaved = balance * rate * monthsSaved
      return { results: [{ label: 'Months Saved', value: monthsSaved, highlight: true }, { label: 'Interest Saved', value: `$${Math.round(interestSaved).toLocaleString()}` }], formula: { formula: 'Extra payments reduce principal faster', explanation: `Adding $${extra}/month saves approximately ${monthsSaved} months.` } }
    }
  },
  'escrow': {
    name: 'Escrow Calculator', description: 'Monthly escrow', longDescription: 'Calculate monthly escrow payment for taxes and insurance.', category: 'financial', icon: Home,
    inputs: [{ id: 'taxes', label: 'Annual Property Taxes ($)', placeholder: '3000' }, { id: 'insurance', label: 'Annual Insurance ($)', placeholder: '1200' }],
    calculate: (inputs) => {
      const taxes = parseFloat(inputs.taxes), insurance = parseFloat(inputs.insurance)
      if (!taxes && !insurance) return { results: [] }
      const monthly = (taxes + insurance) / 12
      return { results: [{ label: 'Monthly Escrow', value: `$${Math.round(monthly).toLocaleString()}`, highlight: true }, { label: 'Annual Total', value: `$${Math.round(taxes + insurance).toLocaleString()}` }], pieData: [{ label: 'Taxes', value: taxes, color: '#3b82f6' }, { label: 'Insurance', value: insurance, color: '#22c55e' }], formula: { formula: 'Monthly = (Taxes + Insurance) / 12', explanation: 'Monthly escrow covers property taxes and insurance.' } }
    }
  },
  'graduated-payments': {
    name: 'Graduated Payment Calculator', description: 'Increasing payments', longDescription: 'Calculate loan payments that increase over time.', category: 'financial', icon: TrendingUp,
    inputs: [{ id: 'amount', label: 'Loan Amount ($)', placeholder: '200000' }, { id: 'rate', label: 'Interest Rate (%)', placeholder: '5' }, { id: 'growth', label: 'Annual Growth (%)', placeholder: '5' }],
    calculate: (inputs) => {
      const amount = parseFloat(inputs.amount), rate = parseFloat(inputs.rate) / 100 / 12, growth = parseFloat(inputs.growth) / 100
      if (!amount || !rate) return { results: [] }
      const initialPayment = amount * rate * 0.7
      const year5Payment = initialPayment * Math.pow(1 + growth, 5)
      return { results: [{ label: 'Initial Payment', value: `$${Math.round(initialPayment).toLocaleString()}` }, { label: 'Year 5 Payment', value: `$${Math.round(year5Payment).toLocaleString()}`, highlight: true }], formula: { formula: 'Payments grow annually by specified rate', explanation: `Payments start lower and increase ${inputs.growth}% annually.` } }
    }
  },
  'hecm': {
    name: 'HECM Calculator', description: 'Reverse mortgage', longDescription: 'Calculate potential proceeds from a reverse mortgage.', category: 'financial', icon: Home,
    inputs: [{ id: 'value', label: 'Home Value ($)', placeholder: '400000' }, { id: 'age', label: 'Youngest Borrower Age', placeholder: '70' }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value), age = parseFloat(inputs.age)
      if (!value || !age) return { results: [] }
      const factor = Math.min(0.8, (age - 62) * 0.01 + 0.5)
      const proceeds = value * factor
      return { results: [{ label: 'Estimated Proceeds', value: `$${Math.round(proceeds).toLocaleString()}`, highlight: true }, { label: 'Principal Limit Factor', value: `${(factor * 100).toFixed(0)}%` }], formula: { formula: 'Proceeds = Home Value × Principal Limit Factor', explanation: 'Based on age and home value.' } }
    }
  },
  'lease-buy': {
    name: 'Lease vs Buy Calculator', description: 'Compare options', longDescription: 'Compare the cost of leasing vs buying a car.', category: 'financial', icon: Car,
    inputs: [{ id: 'price', label: 'Car Price ($)', placeholder: '35000' }, { id: 'leasePayment', label: 'Monthly Lease ($)', placeholder: '350' }, { id: 'loanPayment', label: 'Monthly Loan ($)', placeholder: '550' }],
    calculate: (inputs) => {
      const price = parseFloat(inputs.price), lease = parseFloat(inputs.leasePayment), loan = parseFloat(inputs.loanPayment)
      if (!lease || !loan) return { results: [] }
      const leaseTotal = lease * 36, loanTotal = loan * 60
      const equity = price - (loanTotal * 0.4)
      return { results: [{ label: '3-Year Lease Total', value: `$${Math.round(leaseTotal).toLocaleString()}` }, { label: '5-Year Loan Total', value: `$${Math.round(loanTotal).toLocaleString()}` }, { label: 'Estimated Equity After Loan', value: `$${Math.round(equity).toLocaleString()}`, highlight: true }], formula: { formula: 'Compare total costs and equity', explanation: 'Buying builds equity; leasing offers lower payments.' } }
    }
  },
  'loan-comparison': {
    name: 'Loan Comparison Calculator', description: 'Compare loans', longDescription: 'Compare two different loan options.', category: 'financial', icon: CreditCard,
    inputs: [{ id: 'amount', label: 'Loan Amount ($)', placeholder: '25000' }, { id: 'rate1', label: 'Rate 1 (%)', placeholder: '5' }, { id: 'rate2', label: 'Rate 2 (%)', placeholder: '4' }, { id: 'term', label: 'Term (years)', placeholder: '5' }],
    calculate: (inputs) => {
      const amount = parseFloat(inputs.amount), r1 = parseFloat(inputs.rate1) / 100 / 12, r2 = parseFloat(inputs.rate2) / 100 / 12, term = parseFloat(inputs.term) * 12
      if (!amount || !r1 || !r2 || !term) return { results: [] }
      const pmt1 = amount * (r1 * Math.pow(1 + r1, term)) / (Math.pow(1 + r1, term) - 1)
      const pmt2 = amount * (r2 * Math.pow(1 + r2, term)) / (Math.pow(1 + r2, term) - 1)
      const savings = (pmt1 - pmt2) * term
      return { results: [{ label: 'Loan 1 Monthly', value: `$${Math.round(pmt1).toLocaleString()}` }, { label: 'Loan 2 Monthly', value: `$${Math.round(pmt2).toLocaleString()}` }, { label: 'Total Savings', value: `$${Math.round(savings).toLocaleString()}`, highlight: true }], formula: { formula: 'Compare monthly payments and total interest', explanation: `Loan 2 saves $${Math.round(savings).toLocaleString()} over ${inputs.term} years.` } }
    }
  },
  // NEW MATH CALCULATORS
  'bmi-zscore': {
    name: 'BMI Z-Score Calculator', description: 'Statistical BMI', longDescription: 'Calculate BMI Z-score for statistical comparison.', category: 'math', icon: BarChart3,
    inputs: [{ id: 'bmi', label: 'Your BMI', placeholder: '25' }, { id: 'mean', label: 'Population Mean BMI', placeholder: '27' }, { id: 'sd', label: 'Standard Deviation', placeholder: '5' }],
    calculate: (inputs) => {
      const bmi = parseFloat(inputs.bmi), mean = parseFloat(inputs.mean), sd = parseFloat(inputs.sd)
      if (!bmi || !mean || !sd) return { results: [] }
      const zscore = (bmi - mean) / sd
      return { results: [{ label: 'Z-Score', value: zscore.toFixed(3), highlight: true }, { label: 'Percentile', value: `${Math.round((1 + zscore / 3) * 50)}%` }], formula: { formula: 'Z = (X - μ) / σ', explanation: `Your BMI is ${zscore.toFixed(2)} standard deviations from the mean.` } }
    }
  },
  'coefficient': {
    name: 'Coefficient of Variation', description: 'Variation coeff', longDescription: 'Calculate coefficient of variation for a dataset.', category: 'math', icon: BarChart3,
    inputs: [{ id: 'numbers', label: 'Numbers (comma-separated)', placeholder: '10, 20, 30, 40, 50' }],
    calculate: (inputs) => {
      const nums = inputs.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n))
      if (nums.length < 2) return { results: [{ label: 'Error', value: 'Enter 2+ numbers' }] }
      const mean = nums.reduce((a, b) => a + b, 0) / nums.length
      const variance = nums.reduce((sum, n) => sum + Math.pow(n - mean, 2), 0) / nums.length
      const sd = Math.sqrt(variance)
      const cv = (sd / mean) * 100
      return { results: [{ label: 'Mean', value: mean.toFixed(2) }, { label: 'Std Dev', value: sd.toFixed(2) }, { label: 'CV', value: cv.toFixed(2), unit: '%', highlight: true }], formula: { formula: 'CV = (σ / μ) × 100%', explanation: `Coefficient of variation: ${cv.toFixed(2)}%` } }
    }
  },
  'correlation': {
    name: 'Correlation Calculator', description: 'Relationship strength', longDescription: 'Calculate Pearson correlation coefficient between two datasets.', category: 'math', icon: TrendingUp,
    inputs: [{ id: 'x', label: 'X Values (comma-separated)', placeholder: '1, 2, 3, 4, 5' }, { id: 'y', label: 'Y Values (comma-separated)', placeholder: '2, 4, 5, 4, 5' }],
    calculate: (inputs) => {
      const x = inputs.x.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n))
      const y = inputs.y.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n))
      if (x.length !== y.length || x.length < 2) return { results: [{ label: 'Error', value: 'Enter equal number of X and Y values' }] }
      const meanX = x.reduce((a, b) => a + b, 0) / x.length
      const meanY = y.reduce((a, b) => a + b, 0) / y.length
      let num = 0, denX = 0, denY = 0
      for (let i = 0; i < x.length; i++) {
        num += (x[i] - meanX) * (y[i] - meanY)
        denX += Math.pow(x[i] - meanX, 2)
        denY += Math.pow(y[i] - meanY, 2)
      }
      const r = num / Math.sqrt(denX * denY)
      let strength: string
      if (Math.abs(r) >= 0.7) strength = 'Strong'
      else if (Math.abs(r) >= 0.4) strength = 'Moderate'
      else strength = 'Weak'
      return { results: [{ label: 'Correlation (r)', value: r.toFixed(4), highlight: true }, { label: 'Strength', value: strength }], formula: { formula: 'r = Σ[(xi-x̄)(yi-ȳ)] / √[Σ(xi-x̄)² × Σ(yi-ȳ)²]', explanation: `${strength} ${r >= 0 ? 'positive' : 'negative'} correlation.` } }
    }
  },
  'covariance': {
    name: 'Covariance Calculator', description: 'Joint variability', longDescription: 'Calculate covariance between two datasets.', category: 'math', icon: BarChart3,
    inputs: [{ id: 'x', label: 'X Values (comma-separated)', placeholder: '1, 2, 3, 4, 5' }, { id: 'y', label: 'Y Values (comma-separated)', placeholder: '2, 4, 6, 8, 10' }],
    calculate: (inputs) => {
      const x = inputs.x.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n))
      const y = inputs.y.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n))
      if (x.length !== y.length || x.length < 2) return { results: [{ label: 'Error', value: 'Enter equal number of X and Y values' }] }
      const meanX = x.reduce((a, b) => a + b, 0) / x.length
      const meanY = y.reduce((a, b) => a + b, 0) / y.length
      const cov = x.reduce((sum, xi, i) => sum + (xi - meanX) * (y[i] - meanY), 0) / (x.length - 1)
      return { results: [{ label: 'Covariance', value: cov.toFixed(4), highlight: true }, { label: 'Direction', value: cov > 0 ? 'Positive' : cov < 0 ? 'Negative' : 'No relationship' }], formula: { formula: 'Cov = Σ[(xi-x̄)(yi-ȳ)] / (n-1)', explanation: `Covariance indicates ${cov > 0 ? 'positive' : 'negative'} relationship.` } }
    }
  },
  'cross-product': {
    name: 'Cross Product Calculator', description: 'Vector product', longDescription: 'Calculate cross product of two 3D vectors.', category: 'math', icon: Calculator,
    inputs: [{ id: 'v1', label: 'Vector 1 (x,y,z)', placeholder: '1, 0, 0' }, { id: 'v2', label: 'Vector 2 (x,y,z)', placeholder: '0, 1, 0' }],
    calculate: (inputs) => {
      const v1 = inputs.v1.split(',').map(n => parseFloat(n.trim()))
      const v2 = inputs.v2.split(',').map(n => parseFloat(n.trim()))
      if (v1.length !== 3 || v2.length !== 3) return { results: [{ label: 'Error', value: 'Enter 3 values for each vector' }] }
      const cross = [v1[1] * v2[2] - v1[2] * v2[1], v1[2] * v2[0] - v1[0] * v2[2], v1[0] * v2[1] - v1[1] * v2[0]]
      return { results: [{ label: 'Cross Product', value: `(${cross.map(c => c.toFixed(2)).join(', ')})`, highlight: true }], formula: { formula: 'A × B = (Ay*Bz-Az*By, Az*Bx-Ax*Bz, Ax*By-Ay*Bx)', explanation: 'Cross product is perpendicular to both input vectors.' } }
    }
  },
  'derivative': {
    name: 'Derivative Calculator', description: 'Rate of change', longDescription: 'Calculate the derivative of simple functions.', category: 'math', icon: TrendingUp,
    inputs: [{ id: 'function', label: 'Function (ax^n)', placeholder: '3x^2' }, { id: 'x', label: 'At x = ', placeholder: '2' }],
    calculate: (inputs) => {
      const match = inputs.function.match(/(-?\d*\.?\d*)x\^(-?\d*\.?\d*)/)
      if (!match) return { results: [{ label: 'Error', value: 'Use format: ax^n (e.g., 3x^2)' }] }
      const a = parseFloat(match[1]) || 1, n = parseFloat(match[2])
      const x = parseFloat(inputs.x)
      const derivCoeff = a * n, derivPower = n - 1
      const value = derivCoeff * Math.pow(x, derivPower)
      return { results: [{ label: 'Derivative', value: `${derivCoeff}x^${derivPower}`, highlight: true }, { label: `f'(${x})`, value: value.toFixed(4) }], formula: { formula: 'd/dx(ax^n) = anx^(n-1)', explanation: `Derivative of ${inputs.function} evaluated at x=${x}.` } }
    }
  },
  'eigenvalue': {
    name: 'Eigenvalue Calculator', description: 'Matrix analysis', longDescription: 'Calculate eigenvalues of a 2x2 matrix.', category: 'math', icon: Square,
    inputs: [{ id: 'a', label: 'a (top-left)', placeholder: '4' }, { id: 'b', label: 'b (top-right)', placeholder: '2' }, { id: 'c', label: 'c (bottom-left)', placeholder: '1' }, { id: 'd', label: 'd (bottom-right)', placeholder: '3' }],
    calculate: (inputs) => {
      const a = parseFloat(inputs.a), b = parseFloat(inputs.b), c = parseFloat(inputs.c), d = parseFloat(inputs.d)
      if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) return { results: [] }
      const trace = a + d, det = a * d - b * c
      const discriminant = trace * trace - 4 * det
      const lambda1 = (trace + Math.sqrt(Math.max(0, discriminant))) / 2
      const lambda2 = (trace - Math.sqrt(Math.max(0, discriminant))) / 2
      return { results: [{ label: 'λ₁', value: lambda1.toFixed(4), highlight: true }, { label: 'λ₂', value: lambda2.toFixed(4), highlight: true }], formula: { formula: 'det(A - λI) = 0', explanation: 'Eigenvalues found by solving the characteristic equation.' } }
    }
  },
  'geometric-mean': {
    name: 'Geometric Mean Calculator', description: 'Average rate', longDescription: 'Calculate geometric mean of a dataset.', category: 'math', icon: BarChart3,
    inputs: [{ id: 'numbers', label: 'Numbers (comma-separated)', placeholder: '2, 4, 8' }],
    calculate: (inputs) => {
      const nums = inputs.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n) && n > 0)
      if (nums.length < 2) return { results: [{ label: 'Error', value: 'Enter 2+ positive numbers' }] }
      const product = nums.reduce((a, b) => a * b, 1)
      const gm = Math.pow(product, 1 / nums.length)
      return { results: [{ label: 'Geometric Mean', value: gm.toFixed(4), highlight: true }], formula: { formula: 'GM = ⁿ√(x₁ × x₂ × ... × xₙ)', explanation: `Geometric mean of ${nums.length} numbers.` } }
    }
  },
  'harmonic-mean': {
    name: 'Harmonic Mean Calculator', description: 'Rates average', longDescription: 'Calculate harmonic mean for averaging rates.', category: 'math', icon: BarChart3,
    inputs: [{ id: 'numbers', label: 'Numbers (comma-separated)', placeholder: '2, 4, 8' }],
    calculate: (inputs) => {
      const nums = inputs.numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n) && n > 0)
      if (nums.length < 2) return { results: [{ label: 'Error', value: 'Enter 2+ positive numbers' }] }
      const sumReciprocals = nums.reduce((sum, n) => sum + 1 / n, 0)
      const hm = nums.length / sumReciprocals
      return { results: [{ label: 'Harmonic Mean', value: hm.toFixed(4), highlight: true }], formula: { formula: 'HM = n / Σ(1/xᵢ)', explanation: `Harmonic mean of ${nums.length} numbers.` } }
    }
  },
  'inverse-matrix': {
    name: 'Inverse Matrix Calculator', description: 'Matrix inverse', longDescription: 'Calculate the inverse of a 2x2 matrix.', category: 'math', icon: Square,
    inputs: [{ id: 'a', label: 'a (top-left)', placeholder: '4' }, { id: 'b', label: 'b (top-right)', placeholder: '7' }, { id: 'c', label: 'c (bottom-left)', placeholder: '2' }, { id: 'd', label: 'd (bottom-right)', placeholder: '6' }],
    calculate: (inputs) => {
      const a = parseFloat(inputs.a), b = parseFloat(inputs.b), c = parseFloat(inputs.c), d = parseFloat(inputs.d)
      if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) return { results: [] }
      const det = a * d - b * c
      if (det === 0) return { results: [{ label: 'Error', value: 'Matrix is not invertible (determinant = 0)' }] }
      const inv = [[d / det, -b / det], [-c / det, a / det]]
      return { results: [{ label: 'Determinant', value: det.toFixed(4) }, { label: 'Inverse', value: `[[${inv[0][0].toFixed(2)}, ${inv[0][1].toFixed(2)}], [${inv[1][0].toFixed(2)}, ${inv[1][1].toFixed(2)}]]`, highlight: true }], formula: { formula: 'A⁻¹ = (1/det) × [[d, -b], [-c, a]]', explanation: 'Inverse found by dividing adjugate by determinant.' } }
    }
  },
  'linear-regression': {
    name: 'Linear Regression Calculator', description: 'Best fit line', longDescription: 'Calculate linear regression (best fit line) for data points.', category: 'math', icon: TrendingUp,
    inputs: [{ id: 'x', label: 'X Values (comma-separated)', placeholder: '1, 2, 3, 4, 5' }, { id: 'y', label: 'Y Values (comma-separated)', placeholder: '2, 4, 5, 4, 5' }],
    calculate: (inputs) => {
      const x = inputs.x.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n))
      const y = inputs.y.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n))
      if (x.length !== y.length || x.length < 2) return { results: [{ label: 'Error', value: 'Enter equal number of X and Y values' }] }
      const n = x.length
      const sumX = x.reduce((a, b) => a + b, 0), sumY = y.reduce((a, b) => a + b, 0)
      const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0)
      const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0)
      const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
      const b = (sumY - m * sumX) / n
      return { results: [{ label: 'Slope (m)', value: m.toFixed(4) }, { label: 'Intercept (b)', value: b.toFixed(4) }, { label: 'Equation', value: `y = ${m.toFixed(2)}x + ${b.toFixed(2)}`, highlight: true }], formula: { formula: 'y = mx + b', explanation: `Best fit line through ${n} data points.` } }
    }
  },
  'modulo': {
    name: 'Modulo Calculator', description: 'Remainder calc', longDescription: 'Calculate the remainder of division.', category: 'math', icon: Hash,
    inputs: [{ id: 'dividend', label: 'Dividend', placeholder: '17' }, { id: 'divisor', label: 'Divisor', placeholder: '5' }],
    calculate: (inputs) => {
      const a = parseFloat(inputs.dividend), b = parseFloat(inputs.divisor)
      if (!a || !b) return { results: [] }
      const remainder = a % b
      return { results: [{ label: 'Quotient', value: Math.floor(a / b) }, { label: 'Remainder', value: remainder, highlight: true }], formula: { formula: 'a mod b', explanation: `${a} ÷ ${b} = ${Math.floor(a / b)} with remainder ${remainder}` } }
    }
  },
  'nth-root': {
    name: 'Nth Root Calculator', description: 'Any root', longDescription: 'Calculate the nth root of any number.', category: 'math', icon: Square,
    inputs: [{ id: 'number', label: 'Number', placeholder: '27' }, { id: 'n', label: 'Root (n)', placeholder: '3' }],
    calculate: (inputs) => {
      const num = parseFloat(inputs.number), n = parseFloat(inputs.n)
      if (!num || !n) return { results: [] }
      const root = Math.pow(num, 1 / n)
      return { results: [{ label: `${n}th Root`, value: root.toFixed(6), highlight: true }], formula: { formula: `ⁿ√x = x^(1/n)`, explanation: `The ${n}th root of ${num} is ${root.toFixed(4)}.` } }
    }
  },
  'polynomial': {
    name: 'Polynomial Root Finder', description: 'Root finder', longDescription: 'Find roots of a quadratic polynomial (ax² + bx + c).', category: 'math', icon: Calculator,
    inputs: [{ id: 'a', label: 'a (x² coefficient)', placeholder: '1' }, { id: 'b', label: 'b (x coefficient)', placeholder: '-5' }, { id: 'c', label: 'c (constant)', placeholder: '6' }],
    calculate: (inputs) => {
      const a = parseFloat(inputs.a), b = parseFloat(inputs.b), c = parseFloat(inputs.c)
      if (!a) return { results: [{ label: 'Error', value: 'a cannot be zero' }] }
      const discriminant = b * b - 4 * a * c
      if (discriminant < 0) {
        const real = -b / (2 * a), imag = Math.sqrt(-discriminant) / (2 * a)
        return { results: [{ label: 'Root 1', value: `${real.toFixed(4)} + ${imag.toFixed(4)}i`, highlight: true }, { label: 'Root 2', value: `${real.toFixed(4)} - ${imag.toFixed(4)}i`, highlight: true }], formula: { formula: 'x = (-b ± √(b²-4ac)) / 2a', explanation: 'Complex roots (discriminant < 0).' } }
      }
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a), x2 = (-b - Math.sqrt(discriminant)) / (2 * a)
      return { results: [{ label: 'Root 1 (x₁)', value: x1.toFixed(4), highlight: true }, { label: 'Root 2 (x₂)', value: x2.toFixed(4), highlight: true }], formula: { formula: 'x = (-b ± √(b²-4ac)) / 2a', explanation: `${discriminant === 0 ? 'One repeated root' : 'Two distinct real roots'}.` } }
    }
  },
  // NEW DATE & TIME CALCULATORS
  'anniversary': {
    name: 'Anniversary Calculator', description: 'Years together', longDescription: 'Calculate years, months, and days together.', category: 'datetime', icon: Heart,
    inputs: [{ id: 'start', label: 'Start Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.start) return { results: [] }
      const start = new Date(inputs.start), today = new Date()
      let years = today.getFullYear() - start.getFullYear(), months = today.getMonth() - start.getMonth(), days = today.getDate() - start.getDate()
      if (days < 0) { months--; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate() }
      if (months < 0) { years--; months += 12 }
      const totalDays = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      return { results: [{ label: 'Time Together', value: `${years}y ${months}m ${days}d`, highlight: true }, { label: 'Total Days', value: totalDays.toLocaleString() }], formula: { formula: 'Years, months, and days together', explanation: `Celebrating ${years} years of togetherness!` } }
    }
  },
  'biorhythm': {
    name: 'Biorhythm Calculator', description: 'Body cycles', longDescription: 'Calculate your physical, emotional, and intellectual biorhythm cycles.', category: 'datetime', icon: Activity,
    inputs: [{ id: 'birthdate', label: 'Date of Birth', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.birthdate) return { results: [] }
      const birth = new Date(inputs.birthdate), today = new Date()
      const days = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))
      const physical = Math.sin((2 * Math.PI * days) / 23), emotional = Math.sin((2 * Math.PI * days) / 28), intellectual = Math.sin((2 * Math.PI * days) / 33)
      const toPercent = (v: number) => Math.round((v + 1) * 50)
      return { results: [{ label: 'Physical', value: `${toPercent(physical)}%` }, { label: 'Emotional', value: `${toPercent(emotional)}%` }, { label: 'Intellectual', value: `${toPercent(intellectual)}%`, highlight: true }], pieData: [{ label: 'Physical', value: toPercent(physical), color: '#ef4444' }, { label: 'Emotional', value: toPercent(emotional), color: '#22c55e' }, { label: 'Intellectual', value: toPercent(intellectual), color: '#3b82f6' }], formula: { formula: 'sin(2π × days / cycle)', explanation: 'Biorhythm cycles: Physical (23), Emotional (28), Intellectual (33) days.' } }
    }
  },
  'business-days-add': {
    name: 'Add Business Days', description: 'Skip weekends', longDescription: 'Add business days to a date, skipping weekends.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'start', label: 'Start Date', placeholder: '', type: 'date' }, { id: 'days', label: 'Business Days to Add', placeholder: '10' }],
    calculate: (inputs) => {
      if (!inputs.start) return { results: [] }
      const start = new Date(inputs.start), daysToAdd = parseFloat(inputs.days) || 0
      let current = new Date(start), added = 0
      while (added < daysToAdd) {
        current.setDate(current.getDate() + 1)
        if (current.getDay() !== 0 && current.getDay() !== 6) added++
      }
      const calendarDays = Math.floor((current.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      return { results: [{ label: 'Result Date', value: current.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }), highlight: true }, { label: 'Calendar Days', value: calendarDays }], formula: { formula: 'Add days excluding weekends', explanation: `${daysToAdd} business days added.` } }
    }
  },
  'calendar-week': {
    name: 'Calendar Week Calculator', description: 'Week number', longDescription: 'Find the week number for any date.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const date = new Date(inputs.date)
      const startOfYear = new Date(date.getFullYear(), 0, 1)
      const days = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24))
      const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7)
      return { results: [{ label: 'Week Number', value: weekNumber, highlight: true }, { label: 'Year', value: date.getFullYear() }], formula: { formula: 'Week = ⌈(days + startDay + 1) / 7⌉', explanation: `Week ${weekNumber} of ${date.getFullYear()}.` } }
    }
  },
  'date-format': {
    name: 'Date Format Converter', description: 'Format converter', longDescription: 'Convert dates between different formats.', category: 'datetime', icon: FileText,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const date = new Date(inputs.date)
      return { results: [{ label: 'ISO Format', value: date.toISOString().split('T')[0], highlight: true }, { label: 'US Format', value: date.toLocaleDateString('en-US') }, { label: 'EU Format', value: date.toLocaleDateString('en-GB') }, { label: 'Long Format', value: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }], formula: { formula: 'Date formatting', explanation: 'Different date representations.' } }
    }
  },
  'days-in-month': {
    name: 'Days in Month Calculator', description: 'Month length', longDescription: 'Find the number of days in any month.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'month', label: 'Month', placeholder: '', type: 'select', options: [{ value: '0', label: 'January' }, { value: '1', label: 'February' }, { value: '2', label: 'March' }, { value: '3', label: 'April' }, { value: '4', label: 'May' }, { value: '5', label: 'June' }, { value: '6', label: 'July' }, { value: '7', label: 'August' }, { value: '8', label: 'September' }, { value: '9', label: 'October' }, { value: '10', label: 'November' }, { value: '11', label: 'December' }] }, { id: 'year', label: 'Year', placeholder: '2024' }],
    calculate: (inputs) => {
      const month = parseInt(inputs.month), year = parseFloat(inputs.year) || new Date().getFullYear()
      const days = new Date(year, month + 1, 0).getDate()
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      return { results: [{ label: `${monthNames[month]} ${year}`, value: days, unit: 'days', highlight: true }], formula: { formula: 'Days in month', explanation: `${monthNames[month]} ${year} has ${days} days.` } }
    }
  },
  'days-until-summer': {
    name: 'Days Until Summer', description: 'Season countdown', longDescription: 'Count days until summer solstice (June 21).', category: 'datetime', icon: Sun,
    inputs: [],
    calculate: () => {
      const today = new Date()
      let summer = new Date(today.getFullYear(), 5, 21)
      if (summer < today) summer = new Date(today.getFullYear() + 1, 5, 21)
      const days = Math.ceil((summer.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      return { results: [{ label: 'Days Until Summer', value: days, highlight: true }, { label: 'Summer Starts', value: summer.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) }], formula: { formula: 'Summer = June 21', explanation: `${days} days until summer solstice!` } }
    }
  },
  'earth-age': {
    name: 'Earth Age Calculator', description: 'Days on Earth', longDescription: 'Calculate how many days you have been on Earth.', category: 'datetime', icon: Globe,
    inputs: [{ id: 'birthdate', label: 'Date of Birth', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.birthdate) return { results: [] }
      const birth = new Date(inputs.birthdate), today = new Date()
      const days = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))
      const hours = days * 24, heartbeats = days * 24 * 60 * 72
      return { results: [{ label: 'Days on Earth', value: days.toLocaleString(), highlight: true }, { label: 'Hours', value: hours.toLocaleString() }, { label: 'Heartbeats (est.)', value: heartbeats.toLocaleString() }], formula: { formula: 'Days = (Today - Birth) / 86400000', explanation: `You have lived ${days.toLocaleString()} days!` } }
    }
  },
  'fiscal-year': {
    name: 'Fiscal Year Calculator', description: 'Business year', longDescription: 'Determine the fiscal year for a given date.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }, { id: 'startMonth', label: 'FY Start Month', placeholder: '', type: 'select', options: [{ value: '0', label: 'January' }, { value: '6', label: 'July' }, { value: '9', label: 'October' }] }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const date = new Date(inputs.date), startMonth = parseInt(inputs.startMonth || '0')
      const fy = date.getMonth() >= startMonth ? date.getFullYear() + 1 : date.getFullYear()
      return { results: [{ label: 'Fiscal Year', value: `FY${fy}`, highlight: true }, { label: 'Calendar Year', value: date.getFullYear() }], formula: { formula: 'FY = Year + (Month >= Start ? 1 : 0)', explanation: `Fiscal year starting ${['January', 'July', 'October'][['0', '6', '9'].indexOf(inputs.startMonth || '0')]}.` } }
    }
  },
  'gregorian-julian': {
    name: 'Gregorian to Julian', description: 'Calendar convert', longDescription: 'Convert between Gregorian and Julian calendar dates.', category: 'datetime', icon: Globe,
    inputs: [{ id: 'date', label: 'Gregorian Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const gregorian = new Date(inputs.date)
      const julianOffset = 13
      const julian = new Date(gregorian)
      julian.setDate(julian.getDate() + julianOffset)
      return { results: [{ label: 'Gregorian', value: gregorian.toLocaleDateString(), highlight: true }, { label: 'Julian (est.)', value: julian.toLocaleDateString() }], formula: { formula: 'Julian = Gregorian + 13 days', explanation: 'Approximate conversion (current difference is 13 days).' } }
    }
  },
  'hours-worked': {
    name: 'Hours Worked Calculator', description: 'Time tracking', longDescription: 'Calculate total hours worked.', category: 'datetime', icon: Clock,
    inputs: [{ id: 'start', label: 'Start Time', placeholder: '09:00', type: 'time' }, { id: 'end', label: 'End Time', placeholder: '17:00', type: 'time' }, { id: 'break', label: 'Break (minutes)', placeholder: '30' }],
    calculate: (inputs) => {
      if (!inputs.start || !inputs.end) return { results: [] }
      const [sh, sm] = inputs.start.split(':').map(Number), [eh, em] = inputs.end.split(':').map(Number)
      const startMins = sh * 60 + sm, endMins = eh * 60 + em
      const breakMins = parseFloat(inputs.break) || 0
      let totalMins = endMins - startMins - breakMins
      if (totalMins < 0) totalMins += 24 * 60
      const hours = Math.floor(totalMins / 60), mins = totalMins % 60
      return { results: [{ label: 'Hours Worked', value: `${hours}h ${mins}m`, highlight: true }, { label: 'Decimal Hours', value: (totalMins / 60).toFixed(2) }], formula: { formula: 'Hours = End - Start - Break', explanation: `Total work time after ${breakMins} minute break.` } }
    }
  },
  'iso-week': {
    name: 'ISO Week Calculator', description: 'ISO week num', longDescription: 'Calculate ISO week number for a date.', category: 'datetime', icon: Calendar,
    inputs: [{ id: 'date', label: 'Date', placeholder: '', type: 'date' }],
    calculate: (inputs) => {
      if (!inputs.date) return { results: [] }
      const date = new Date(inputs.date)
      const isoWeek = getISOWeek(date)
      return { results: [{ label: 'ISO Week', value: `${isoWeek.year}-W${isoWeek.week.toString().padStart(2, '0')}`, highlight: true }, { label: 'Week Number', value: isoWeek.week }], formula: { formula: 'ISO 8601 week date', explanation: `Week ${isoWeek.week} of ${isoWeek.year}.` } }
    }
  },
  'next-holiday': {
    name: 'Next Holiday Calculator', description: 'Upcoming holiday', longDescription: 'Find the next major US holiday.', category: 'datetime', icon: Star,
    inputs: [],
    calculate: () => {
      const today = new Date()
      const year = today.getFullYear()
      const holidays = [
        { name: "New Year's Day", date: new Date(year, 0, 1) },
        { name: "Valentine's Day", date: new Date(year, 1, 14) },
        { name: "Memorial Day", date: new Date(year, 4, 31 - new Date(year, 4, 31).getDay()) },
        { name: "Independence Day", date: new Date(year, 6, 4) },
        { name: "Labor Day", date: new Date(year, 8, 1 + (8 - new Date(year, 8, 1).getDay()) % 7) },
        { name: "Halloween", date: new Date(year, 9, 31) },
        { name: "Veterans Day", date: new Date(year, 10, 11) },
        { name: "Thanksgiving", date: new Date(year, 10, 22 + (11 - new Date(year, 10, 1).getDay()) % 7) },
        { name: "Christmas", date: new Date(year, 11, 25) }
      ]
      let nextHoliday = holidays.find(h => h.date > today)
      if (!nextHoliday) { nextHoliday = { name: "New Year's Day", date: new Date(year + 1, 0, 1) } }
      const days = Math.ceil((nextHoliday.date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      return { results: [{ label: 'Next Holiday', value: nextHoliday.name, highlight: true }, { label: 'Date', value: nextHoliday.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) }, { label: 'Days Until', value: days }], formula: { formula: 'Holiday calendar lookup', explanation: `${days} days until ${nextHoliday.name}.` } }
    }
  },
  'time-card': {
    name: 'Time Card Calculator', description: 'Work hours', longDescription: 'Calculate weekly work hours from time entries.', category: 'datetime', icon: Timer,
    inputs: [{ id: 'hours', label: 'Daily Hours (comma-separated)', placeholder: '8, 7.5, 8, 8, 7' }],
    calculate: (inputs) => {
      const hours = inputs.hours.split(',').map(h => parseFloat(h.trim())).filter(h => !isNaN(h))
      if (hours.length === 0) return { results: [] }
      const total = hours.reduce((sum, h) => sum + h, 0)
      const overtime = Math.max(0, total - 40)
      return { results: [{ label: 'Total Hours', value: total.toFixed(1), highlight: true }, { label: 'Days Worked', value: hours.length }, { label: 'Overtime', value: overtime.toFixed(1), unit: 'hrs' }], formula: { formula: 'Sum of daily hours', explanation: `${total.toFixed(1)} total hours across ${hours.length} days.` } }
    }
  },
  // NEW TOOLS CALCULATORS
  'acceleration': {
    name: 'Acceleration Converter', description: 'Speed change', longDescription: 'Convert acceleration units.', category: 'tools', icon: Zap,
    inputs: [{ id: 'value', label: 'Value', placeholder: '9.8' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'mps2', label: 'm/s²' }, { value: 'g', label: 'g-force' }, { value: 'ftps2', label: 'ft/s²' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'mps2', label: 'm/s²' }, { value: 'g', label: 'g-force' }, { value: 'ftps2', label: 'ft/s²' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toMps2: Record<string, number> = { mps2: 1, g: 9.80665, ftps2: 0.3048 }
      const mps2 = value * toMps2[inputs.from || 'mps2'], result = mps2 / toMps2[inputs.to || 'mps2']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to, highlight: true }], formula: { formula: 'Acceleration conversion', explanation: `${value} ${inputs.from} = ${result.toFixed(4)} ${inputs.to}` } }
    }
  },
  'area-perimeter': {
    name: 'Area & Perimeter Calculator', description: 'Shape calc', longDescription: 'Calculate area and perimeter of common shapes.', category: 'tools', icon: Square,
    inputs: [{ id: 'shape', label: 'Shape', placeholder: '', type: 'select', options: [{ value: 'square', label: 'Square' }, { value: 'rectangle', label: 'Rectangle' }, { value: 'circle', label: 'Circle' }] }, { id: 'dim1', label: 'Side/Length/Radius', placeholder: '5' }, { id: 'dim2', label: 'Width (rectangle only)', placeholder: '3' }],
    calculate: (inputs) => {
      const dim1 = parseFloat(inputs.dim1), dim2 = parseFloat(inputs.dim2), shape = inputs.shape
      if (!dim1) return { results: [] }
      let area: number, perimeter: number
      if (shape === 'square') { area = dim1 * dim1; perimeter = 4 * dim1 }
      else if (shape === 'rectangle') { if (!dim2) return { results: [] }; area = dim1 * dim2; perimeter = 2 * (dim1 + dim2) }
      else { area = Math.PI * dim1 * dim1; perimeter = 2 * Math.PI * dim1 }
      return { results: [{ label: 'Area', value: area.toFixed(2), highlight: true }, { label: 'Perimeter/Circumference', value: perimeter.toFixed(2) }], formula: { formula: shape === 'circle' ? 'A = πr², C = 2πr' : shape === 'rectangle' ? 'A = l×w, P = 2(l+w)' : 'A = s², P = 4s', explanation: `${shape.charAt(0).toUpperCase() + shape.slice(1)} calculations.` } }
    }
  },
  'aspect-ratio': {
    name: 'Aspect Ratio Calculator', description: 'Screen ratio', longDescription: 'Calculate dimensions maintaining aspect ratio.', category: 'tools', icon: Target,
    inputs: [{ id: 'width', label: 'Original Width', placeholder: '1920' }, { id: 'height', label: 'Original Height', placeholder: '1080' }, { id: 'newWidth', label: 'New Width (optional)', placeholder: '1280' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.width), h = parseFloat(inputs.height), newW = parseFloat(inputs.newWidth)
      if (!w || !h) return { results: [] }
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b)
      const d = gcd(w, h)
      const ratioW = w / d, ratioH = h / d
      const results: { label: string; value: string; highlight?: boolean }[] = [{ label: 'Aspect Ratio', value: `${ratioW}:${ratioH}`, highlight: true }]
      if (newW) { const newH = Math.round(newW * h / w); results.push({ label: 'New Height', value: newH.toString() }) }
      return { results, formula: { formula: 'Ratio = Width : Height (simplified)', explanation: `Aspect ratio ${ratioW}:${ratioH}.` } }
    }
  },
  'bandwidth': {
    name: 'Bandwidth Calculator', description: 'Data transfer', longDescription: 'Calculate download time based on bandwidth.', category: 'tools', icon: Globe,
    inputs: [{ id: 'size', label: 'File Size (GB)', placeholder: '10' }, { id: 'speed', label: 'Speed (Mbps)', placeholder: '100' }],
    calculate: (inputs) => {
      const size = parseFloat(inputs.size), speed = parseFloat(inputs.speed)
      if (!size || !speed) return { results: [] }
      const sizeMb = size * 8000, seconds = sizeMb / speed
      const hours = Math.floor(seconds / 3600), mins = Math.floor((seconds % 3600) / 60), secs = Math.round(seconds % 60)
      return { results: [{ label: 'Download Time', value: `${hours}h ${mins}m ${secs}s`, highlight: true }, { label: 'Total Seconds', value: Math.round(seconds) }], formula: { formula: 'Time = Size × 8000 / Speed', explanation: `${size} GB at ${speed} Mbps takes ${hours}h ${mins}m ${secs}s.` } }
    }
  },
  'bitwise': {
    name: 'Bitwise Calculator', description: 'Bit operations', longDescription: 'Perform bitwise operations on numbers.', category: 'tools', icon: Hash,
    inputs: [{ id: 'a', label: 'Number A', placeholder: '12' }, { id: 'b', label: 'Number B', placeholder: '5' }, { id: 'op', label: 'Operation', placeholder: '', type: 'select', options: [{ value: 'and', label: 'AND (&)' }, { value: 'or', label: 'OR (|)' }, { value: 'xor', label: 'XOR (^)' }, { value: 'not', label: 'NOT (~A)' }] }],
    calculate: (inputs) => {
      const a = parseInt(inputs.a), b = parseInt(inputs.b)
      if (isNaN(a)) return { results: [] }
      let result: number
      switch (inputs.op) {
        case 'and': result = a & b; break
        case 'or': result = a | b; break
        case 'xor': result = a ^ b; break
        case 'not': result = ~a; break
        default: result = 0
      }
      return { results: [{ label: 'Decimal', value: result, highlight: true }, { label: 'Binary', value: (result >>> 0).toString(2) }, { label: 'Hex', value: '0x' + (result >>> 0).toString(16).toUpperCase() }], formula: { formula: `Bitwise ${inputs.op?.toUpperCase()}`, explanation: `${a} ${inputs.op} ${b} = ${result}` } }
    }
  },
  'color-contrast': {
    name: 'Color Contrast Checker', description: 'WCAG check', longDescription: 'Check color contrast ratio for accessibility.', category: 'tools', icon: PaletteIcon,
    inputs: [{ id: 'fg', label: 'Foreground (HEX)', placeholder: '#000000' }, { id: 'bg', label: 'Background (HEX)', placeholder: '#FFFFFF' }],
    calculate: (inputs) => {
      const hexToRgb = (hex: string) => { const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex); return r ? [parseInt(r[1], 16), parseInt(r[2], 16), parseInt(r[3], 16)] : [0, 0, 0] }
      const luminance = (r: number, g: number, b: number) => { const [rs, gs, bs] = [r/255, g/255, b/255].map(c => c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4)); return 0.2126*rs + 0.7152*gs + 0.0722*bs }
      const [fr, fg, fb] = hexToRgb(inputs.fg), [br, bg, bb] = hexToRgb(inputs.bg)
      const l1 = luminance(fr, fg, fb), l2 = luminance(br, bg, bb)
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
      const aa = ratio >= 4.5, aaa = ratio >= 7
      return { results: [{ label: 'Contrast Ratio', value: `${ratio.toFixed(2)}:1`, highlight: true }, { label: 'WCAG AA', value: aa ? '✓ Pass' : '✗ Fail' }, { label: 'WCAG AAA', value: aaa ? '✓ Pass' : '✗ Fail' }], formula: { formula: 'Ratio = (L1 + 0.05) / (L2 + 0.05)', explanation: `Contrast ratio ${ratio.toFixed(2)}:1.` } }
    }
  },
  'css-units': {
    name: 'CSS Units Converter', description: 'Web units', longDescription: 'Convert between CSS units (px, rem, em, pt).', category: 'tools', icon: Ruler,
    inputs: [{ id: 'value', label: 'Value', placeholder: '16' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'px', label: 'Pixels (px)' }, { value: 'rem', label: 'Root EM (rem)' }, { value: 'pt', label: 'Points (pt)' }] }, { id: 'baseSize', label: 'Base Font Size (px)', placeholder: '16' }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value), base = parseFloat(inputs.baseSize) || 16
      if (isNaN(value)) return { results: [] }
      const toPx: Record<string, number> = { px: 1, rem: base, pt: 96/72 }
      const px = value * toPx[inputs.from || 'px']
      return { results: [{ label: 'Pixels', value: px.toFixed(2), unit: 'px', highlight: true }, { label: 'REM', value: (px / base).toFixed(4), unit: 'rem' }, { label: 'Points', value: (px * 72/96).toFixed(2), unit: 'pt' }], formula: { formula: 'CSS unit conversion', explanation: 'Based on 16px default root size.' } }
    }
  },
  'dns-lookup': {
    name: 'DNS Info Display', description: 'Domain info', longDescription: 'Display DNS-related information.', category: 'tools', icon: Globe,
    inputs: [{ id: 'domain', label: 'Domain Name', placeholder: 'example.com' }],
    calculate: (inputs) => {
      if (!inputs.domain) return { results: [] }
      return { results: [{ label: 'Domain', value: inputs.domain, highlight: true }, { label: 'DNS Check', value: 'Use nslookup or dig for DNS records' }, { label: 'Tip', value: 'Try: nslookup ' + inputs.domain }], formula: { formula: 'DNS lookup', explanation: 'Run `nslookup ' + inputs.domain + '` in terminal for details.' } }
    }
  },
  'escape-unescape': {
    name: 'Escape/Unescape', description: 'String escape', longDescription: 'Escape or unescape strings for various formats.', category: 'tools', icon: FileText,
    inputs: [{ id: 'text', label: 'Text', placeholder: 'Hello "World"' }, { id: 'mode', label: 'Mode', placeholder: '', type: 'select', options: [{ value: 'escape', label: 'Escape' }, { value: 'unescape', label: 'Unescape' }] }],
    calculate: (inputs) => {
      if (!inputs.text) return { results: [] }
      const result = inputs.mode === 'escape' ? inputs.text.replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\t/g, '\\t') : inputs.text.replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\t/g, '\t')
      return { results: [{ label: inputs.mode === 'escape' ? 'Escaped' : 'Unescaped', value: result, highlight: true }], formula: { formula: 'String escaping', explanation: `${inputs.mode === 'escape' ? 'Escaped' : 'Unescaped'} the input string.` } }
    }
  },
  'file-size': {
    name: 'File Size Converter', description: 'Size converter', longDescription: 'Convert between file size units.', category: 'tools', icon: HardDriveIcon,
    inputs: [{ id: 'value', label: 'Value', placeholder: '1024' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'b', label: 'Bytes' }, { value: 'kb', label: 'KB' }, { value: 'mb', label: 'MB' }, { value: 'gb', label: 'GB' }] }, { id: 'to', label: 'To', placeholder: '', type: 'select', options: [{ value: 'b', label: 'Bytes' }, { value: 'kb', label: 'KB' }, { value: 'mb', label: 'MB' }, { value: 'gb', label: 'GB' }] }],
    calculate: (inputs) => {
      const value = parseFloat(inputs.value)
      if (isNaN(value)) return { results: [] }
      const toBytes: Record<string, number> = { b: 1, kb: 1024, mb: 1024*1024, gb: 1024*1024*1024 }
      const bytes = value * toBytes[inputs.from || 'kb'], result = bytes / toBytes[inputs.to || 'mb']
      return { results: [{ label: 'Result', value: result.toFixed(4), unit: inputs.to?.toUpperCase(), highlight: true }], formula: { formula: '1 KB = 1024 Bytes', explanation: `${value} ${inputs.from?.toUpperCase()} = ${result.toFixed(2)} ${inputs.to?.toUpperCase()}` } }
    }
  },
  'hex-decimal': {
    name: 'Hex/Decimal Converter', description: 'Base convert', longDescription: 'Convert between hexadecimal and decimal.', category: 'tools', icon: Hash,
    inputs: [{ id: 'value', label: 'Value', placeholder: 'FF or 255' }, { id: 'from', label: 'From', placeholder: '', type: 'select', options: [{ value: 'hex', label: 'Hexadecimal' }, { value: 'dec', label: 'Decimal' }] }],
    calculate: (inputs) => {
      if (!inputs.value) return { results: [] }
      let decimal: number, hex: string
      if (inputs.from === 'hex') { decimal = parseInt(inputs.value, 16); hex = inputs.value.toUpperCase() }
      else { decimal = parseInt(inputs.value); hex = decimal.toString(16).toUpperCase() }
      return { results: [{ label: 'Decimal', value: decimal, highlight: true }, { label: 'Hexadecimal', value: '0x' + hex }, { label: 'Binary', value: decimal.toString(2) }], formula: { formula: 'Base conversion', explanation: `${inputs.value} in ${inputs.from === 'hex' ? 'decimal' : 'hexadecimal'} is ${inputs.from === 'hex' ? decimal : '0x' + hex}.` } }
    }
  },
  'image-resize': {
    name: 'Image Resize Calculator', description: 'Dimensions', longDescription: 'Calculate new image dimensions while maintaining aspect ratio.', category: 'tools', icon: Square,
    inputs: [{ id: 'width', label: 'Original Width', placeholder: '1920' }, { id: 'height', label: 'Original Height', placeholder: '1080' }, { id: 'newSize', label: 'Target Size', placeholder: '800' }, { id: 'target', label: 'Target', placeholder: '', type: 'select', options: [{ value: 'width', label: 'Width' }, { value: 'height', label: 'Height' }] }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.width), h = parseFloat(inputs.height), newSize = parseFloat(inputs.newSize)
      if (!w || !h || !newSize) return { results: [] }
      const ratio = w / h
      const newW = inputs.target === 'width' ? newSize : Math.round(newSize * ratio)
      const newH = inputs.target === 'height' ? newSize : Math.round(newSize / ratio)
      return { results: [{ label: 'New Dimensions', value: `${newW} × ${newH}`, highlight: true }, { label: 'Aspect Ratio', value: `${(ratio * 100).toFixed(0)}:100` }], formula: { formula: 'Maintain aspect ratio', explanation: `Resized from ${w}×${h} to ${newW}×${newH}.` } }
    }
  },
  'ip-address': {
    name: 'IP Address Info', description: 'IP info', longDescription: 'Parse and display IP address information.', category: 'tools', icon: Globe,
    inputs: [{ id: 'ip', label: 'IP Address', placeholder: '192.168.1.1' }],
    calculate: (inputs) => {
      if (!inputs.ip) return { results: [] }
      const parts = inputs.ip.split('.')
      if (parts.length !== 4) return { results: [{ label: 'Error', value: 'Invalid IPv4 address' }] }
      const [a, b, c, d] = parts.map(p => parseInt(p))
      const isPrivate = (a === 10) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168)
      const ipClass = a < 128 ? 'A' : a < 192 ? 'B' : a < 224 ? 'C' : a < 240 ? 'D' : 'E'
      return { results: [{ label: 'IP Address', value: inputs.ip, highlight: true }, { label: 'Type', value: isPrivate ? 'Private' : 'Public' }, { label: 'Class', value: ipClass }], formula: { formula: 'IPv4 address parsing', explanation: `${isPrivate ? 'Private' : 'Public'} IP address in Class ${ipClass}.` } }
    }
  },
  'pixel-density': {
    name: 'Pixel Density Calculator', description: 'DPI calculator', longDescription: 'Calculate pixel density (PPI/DPI) for displays.', category: 'tools', icon: Target,
    inputs: [{ id: 'width', label: 'Width (pixels)', placeholder: '1920' }, { id: 'height', label: 'Height (pixels)', placeholder: '1080' }, { id: 'diagonal', label: 'Diagonal (inches)', placeholder: '24' }],
    calculate: (inputs) => {
      const w = parseFloat(inputs.width), h = parseFloat(inputs.height), d = parseFloat(inputs.diagonal)
      if (!w || !h || !d) return { results: [] }
      const diagonalPixels = Math.sqrt(w*w + h*h)
      const ppi = diagonalPixels / d
      return { results: [{ label: 'PPI', value: ppi.toFixed(2), highlight: true }, { label: 'Dot Pitch', value: (25.4 / ppi).toFixed(4), unit: 'mm' }], formula: { formula: 'PPI = √(w² + h²) / diagonal', explanation: `${ppi.toFixed(1)} pixels per inch.` } }
    }
  }
}

// Helper function for ISO week
function getISOWeek(date: Date): { year: number; week: number } {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const week = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
  return { year: d.getUTCFullYear(), week }
}

// Category definitions - ALL IDs MUST BE UNIQUE AND MATCH allCalculatorConfigs keys
const categories = [
  { id: 'health', name: 'Fitness & Health', icon: Heart, color: 'from-rose-500 to-pink-500', calculators: [
    { id: 'bmi', name: 'BMI Calculator', description: 'Body Mass Index', icon: Activity },
    { id: 'body-fat', name: 'Body Fat Calculator', description: 'Estimate body fat %', icon: Percent },
    { id: 'calorie', name: 'Calorie Calculator', description: 'Daily calorie needs', icon: FlameIcon },
    { id: 'tdee', name: 'TDEE Calculator', description: 'Total energy expenditure', icon: FlameIcon },
    { id: 'bmr', name: 'BMR Calculator', description: 'Basal metabolic rate', icon: Zap },
    { id: 'ideal-weight', name: 'Ideal Weight Calculator', description: 'Ideal weight', icon: Weight },
    { id: 'protein', name: 'Protein Calculator', description: 'Daily protein needs', icon: Zap },
    { id: 'macro', name: 'Macro Calculator', description: 'Macronutrient split', icon: PieChartIcon },
    { id: 'pace', name: 'Pace Calculator', description: 'Running pace', icon: Timer },
    { id: 'one-rep-max', name: 'One Rep Max', description: 'Max lift weight', icon: Award },
    { id: 'pregnancy', name: 'Pregnancy Calculator', description: 'Due date', icon: Heart },
    { id: 'water-intake', name: 'Water Intake', description: 'Daily water needs', icon: Droplets },
    { id: 'sleep', name: 'Sleep Calculator', description: 'Sleep timing', icon: Moon },
    { id: 'age', name: 'Age Calculator', description: 'Calculate age', icon: Calendar },
    { id: 'heart-rate-zones', name: 'Heart Rate Zones', description: 'Target heart rate', icon: Heart },
    { id: 'body-surface-area', name: 'Body Surface Area', description: 'Calculate BSA', icon: Ruler },
    { id: 'lean-body-mass', name: 'Lean Body Mass', description: 'Calculate LBM', icon: Weight },
    { id: 'waist-to-hip', name: 'Waist-to-Hip Ratio', description: 'Health indicator', icon: Ruler },
    { id: 'due-date', name: 'Due Date Calculator', description: 'Pregnancy due date', icon: Calendar },
    { id: 'ovulation', name: 'Ovulation Calculator', description: 'Fertile days', icon: Calendar },
    { id: 'conception', name: 'Conception Calculator', description: 'Conception timing', icon: Calendar },
    { id: 'gfr', name: 'GFR Calculator', description: 'Kidney function', icon: Activity },
    { id: 'blood-alcohol', name: 'Blood Alcohol', description: 'BAC estimation', icon: AlertCircle },
    { id: 'calories-burned', name: 'Calories Burned', description: 'Exercise calories', icon: FlameIcon },
    { id: 'army-body-fat', name: 'Army Body Fat', description: 'Military standard', icon: Award },
    { id: 'rmr', name: 'RMR Calculator', description: 'Resting metabolic rate', icon: Zap },
    { id: 'ideal-body-weight', name: 'Ideal Body Weight', description: 'Medical ideal', icon: Weight },
    { id: 'adjusted-body-weight', name: 'Adjusted Body Weight', description: 'For obese patients', icon: Weight },
    { id: 'bmi-prime', name: 'BMI Prime', description: 'BMI relative to limit', icon: Activity },
    { id: 'ponderal-index', name: 'Ponderal Index', description: 'Alternative to BMI', icon: Activity },
    { id: 'ffmi', name: 'Fat-Free Mass Index', description: 'FFMI calculator', icon: Activity },
    { id: 'basal-rate', name: 'Basal Rate', description: 'Insulin calculation', icon: Zap },
    { id: 'body-roundness', name: 'Body Roundness', description: 'BRI calculator', icon: Activity },
    { id: 'corpulence', name: 'Corpulence Index', description: 'CI calculator', icon: Activity },
    { id: 'fat-weight', name: 'Fat Weight', description: 'Fat mass weight', icon: Weight },
    { id: 'healthy-weight-range', name: 'Healthy Weight Range', description: 'Weight range', icon: Weight },
    { id: 'metabolic-age', name: 'Metabolic Age', description: 'Body age', icon: Timer },
    { id: 'muscle-mass', name: 'Muscle Mass', description: 'Muscle percentage', icon: Award },
    { id: 'pulse-pressure', name: 'Pulse Pressure', description: 'BP indicator', icon: Heart },
    { id: 'respiratory-rate', name: 'Respiratory Rate', description: 'Breathing rate', icon: Wind },
    { id: 'stress-test', name: 'Stress Test', description: 'Heart stress', icon: Activity },
    { id: 'vo2-max', name: 'VO2 Max', description: 'Cardio fitness', icon: Zap },
    { id: 'allergy-risk', name: 'Allergy Risk', description: 'Allergy assessment', icon: Shield },
    { id: 'blood-pressure', name: 'Blood Pressure', description: 'BP category', icon: Heart },
    { id: 'body-adiposity', name: 'Body Adiposity', description: 'BAI calculator', icon: Percent },
    { id: 'bone-density', name: 'Bone Density', description: 'T-score estimator', icon: Ruler },
    { id: 'calorie-deficit', name: 'Calorie Deficit', description: 'Weight loss rate', icon: TrendingDown },
    { id: 'cardio-risk', name: 'Cardio Risk', description: 'Heart disease risk', icon: Heart },
    { id: 'cholesterol', name: 'Cholesterol', description: 'Lipid profile', icon: Activity },
    { id: 'daily-steps', name: 'Daily Steps', description: 'Step goal calc', icon: Timer },
    { id: 'diabetes-risk', name: 'Diabetes Risk', description: 'Risk assessment', icon: AlertCircle },
    { id: 'hydration', name: 'Hydration Level', description: 'Water status', icon: Droplets },
    { id: 'metabolism-type', name: 'Metabolism Type', description: 'Metabolic type', icon: Zap },
    { id: 'muscle-gain', name: 'Muscle Gain', description: 'Muscle building', icon: Award },
    { id: 'nutrition-score', name: 'Nutrition Score', description: 'Diet quality', icon: Target },
    { id: 'stress-level', name: 'Stress Level', description: 'Stress assessment', icon: Brain }
  ]},
  { id: 'financial', name: 'Financial', icon: DollarSign, color: 'from-emerald-500 to-teal-500', calculators: [
    { id: 'compound-interest', name: 'Compound Interest', description: 'Investment growth', icon: TrendingUp },
    { id: 'mortgage', name: 'Mortgage Calculator', description: 'Monthly payments', icon: Home },
    { id: 'loan', name: 'Loan Calculator', description: 'Loan payments', icon: CreditCard },
    { id: 'tip', name: 'Tip Calculator', description: 'Calculate tips', icon: Receipt },
    { id: 'discount', name: 'Discount Calculator', description: 'Price discounts', icon: Percent },
    { id: 'investment', name: 'Investment Calculator', description: 'Returns', icon: TrendingUp },
    { id: 'savings', name: 'Savings Calculator', description: 'Savings growth', icon: PiggyBank },
    { id: 'auto-loan', name: 'Auto Loan', description: 'Car payments', icon: Car },
    { id: 'retirement', name: 'Retirement', description: 'Retirement planning', icon: PiggyBank },
    { id: 'percentage-change', name: 'Percentage Change', description: '% change', icon: TrendingUp },
    { id: 'sales-tax', name: 'Sales Tax', description: 'Calculate tax', icon: Receipt },
    { id: 'income-tax', name: 'Income Tax', description: 'Estimate tax', icon: Landmark },
    { id: 'net-worth', name: 'Net Worth', description: 'Calculate net worth', icon: Wallet },
    { id: 'roi', name: 'ROI Calculator', description: 'Return on investment', icon: TrendingUp },
    { id: 'apr', name: 'APR Calculator', description: 'Annual rate', icon: Percent },
    { id: 'debt-to-income', name: 'Debt-to-Income', description: 'DTI ratio', icon: CreditCard },
    { id: 'inflation', name: 'Inflation', description: 'Adjust for inflation', icon: TrendingDown },
    { id: 'currency', name: 'Currency Converter', description: 'Convert currency', icon: Coins },
    { id: 'break-even', name: 'Break-Even', description: 'Business analysis', icon: BarChart3 },
    { id: 'amortization', name: 'Amortization', description: 'Loan schedule', icon: FileText },
    { id: 'dividend', name: 'Dividend', description: 'Dividend income', icon: Coins },
    { id: 'cd-calculator', name: 'CD Calculator', description: 'Certificate of Deposit', icon: Landmark },
    { id: 'refinance', name: 'Refinance', description: 'Refinance analysis', icon: Home },
    { id: 'payoff', name: 'Payoff Calculator', description: 'Debt payoff', icon: CreditCard },
    { id: 'bond-yield', name: 'Bond Yield', description: 'Bond returns', icon: TrendingUp },
    { id: 'capital-gains', name: 'Capital Gains', description: 'Tax calculator', icon: DollarSign },
    { id: 'compound-annual-growth', name: 'CAGR', description: 'Annual growth', icon: TrendingUp },
    { id: 'debt-payoff-date', name: 'Debt Payoff Date', description: 'Payoff timeline', icon: Calendar },
    { id: 'effective-rate', name: 'Effective Rate', description: 'Real interest', icon: Percent },
    { id: 'future-value', name: 'Future Value', description: 'Money value', icon: TrendingUp },
    { id: 'interest-only', name: 'Interest Only', description: 'Interest payments', icon: CreditCard },
    { id: 'margin-calculator', name: 'Margin', description: 'Profit margin', icon: DollarSign },
    { id: 'net-present-value', name: 'NPV', description: 'Investment value', icon: TrendingUp },
    { id: 'simple-interest', name: 'Simple Interest', description: 'Basic interest', icon: Percent },
    { id: 'time-value', name: 'Time Value of Money', description: 'TVM calculator', icon: Clock },
    { id: 'annuity', name: 'Annuity', description: 'Payment stream', icon: DollarSign },
    { id: 'asset-allocation', name: 'Asset Allocation', description: 'Portfolio mix', icon: PieChartIcon },
    { id: 'budget', name: 'Budget Calculator', description: 'Monthly budget', icon: Wallet },
    { id: 'car-afford', name: 'Car Affordability', description: 'What you can afford', icon: Car },
    { id: 'college-savings', name: 'College Savings', description: 'Education fund', icon: PiggyBank },
    { id: 'commission', name: 'Commission', description: 'Sales commission', icon: DollarSign },
    { id: 'compound-frequency', name: 'Compound Frequency', description: 'Compare rates', icon: Percent },
    { id: 'cost-of-living', name: 'Cost of Living', description: 'City comparison', icon: Home },
    { id: 'early-payoff', name: 'Early Payoff', description: 'Extra payments', icon: CreditCard },
    { id: 'escrow', name: 'Escrow Calculator', description: 'Monthly escrow', icon: Home },
    { id: 'graduated-payments', name: 'Graduated Payments', description: 'Increasing payments', icon: TrendingUp },
    { id: 'hecm', name: 'HECM Calculator', description: 'Reverse mortgage', icon: Home },
    { id: 'lease-buy', name: 'Lease vs Buy', description: 'Compare options', icon: Car },
    { id: 'loan-comparison', name: 'Loan Compare', description: 'Compare loans', icon: CreditCard }
  ]},
  { id: 'math', name: 'Math', icon: Calculator, color: 'from-violet-500 to-purple-500', calculators: [
    { id: 'percentage', name: 'Percentage', description: 'Calculate percentages', icon: Percent },
    { id: 'scientific', name: 'Scientific', description: 'Advanced math', icon: Calculator },
    { id: 'square-root', name: 'Square Root', description: 'Calculate √x', icon: Square },
    { id: 'gcd', name: 'GCD Calculator', description: 'Greatest common divisor', icon: Hash },
    { id: 'lcm', name: 'LCM Calculator', description: 'Least common multiple', icon: Hash },
    { id: 'factorial', name: 'Factorial', description: 'Calculate n!', icon: Hash },
    { id: 'exponent', name: 'Exponent', description: 'Calculate powers', icon: Calculator },
    { id: 'logarithm', name: 'Logarithm', description: 'Calculate logs', icon: Divide },
    { id: 'fraction', name: 'Fraction', description: 'Work with fractions', icon: Divide },
    { id: 'average', name: 'Average', description: 'Mean, median, mode', icon: BarChart3 },
    { id: 'quadratic', name: 'Quadratic', description: 'Solve equations', icon: Calculator },
    { id: 'ratio', name: 'Ratio', description: 'Solve ratios', icon: Divide },
    { id: 'pythagorean', name: 'Pythagorean', description: 'Triangle sides', icon: Ruler },
    { id: 'circle-area', name: 'Circle Area', description: 'Area & circumference', icon: Target },
    { id: 'triangle-area', name: 'Triangle Area', description: 'Calculate area', icon: Target },
    { id: 'rectangle', name: 'Rectangle', description: 'Area & perimeter', icon: Square },
    { id: 'volume', name: 'Volume', description: '3D volumes', icon: Target },
    { id: 'speed-distance-time', name: 'Speed/Distance/Time', description: 'Calculate any', icon: Timer },
    { id: 'probability', name: 'Probability', description: 'Calculate probability', icon: Target },
    { id: 'prime-checker', name: 'Prime Checker', description: 'Check if prime', icon: Hash },
    { id: 'fibonacci', name: 'Fibonacci', description: 'Generate sequence', icon: Hash },
    { id: 'arithmetic-seq', name: 'Arithmetic Seq', description: 'Calculate sequence', icon: Hash },
    { id: 'geometric-seq', name: 'Geometric Seq', description: 'Calculate sequence', icon: Hash },
    { id: 'complex-numbers', name: 'Complex Numbers', description: 'Complex math', icon: Calculator },
    { id: 'absolute-value', name: 'Absolute Value', description: '|x| calculator', icon: Hash },
    { id: 'binomial', name: 'Binomial', description: 'Binomial expansion', icon: Calculator },
    { id: 'combinations', name: 'Combinations', description: 'nCr calculator', icon: Hash },
    { id: 'cube-root', name: 'Cube Root', description: 'Calculate ∛x', icon: Square },
    { id: 'determinant', name: 'Determinant', description: 'Matrix determinant', icon: Square },
    { id: 'dot-product', name: 'Dot Product', description: 'Vector product', icon: Calculator },
    { id: 'integration', name: 'Integration', description: 'Integral approx', icon: Calculator },
    { id: 'limit', name: 'Limit', description: 'Approach value', icon: Target },
    { id: 'matrix-multiply', name: 'Matrix Multiply', description: 'Matrix math', icon: Square },
    { id: 'permutations', name: 'Permutations', description: 'nPr calculator', icon: Hash },
    { id: 'standard-deviation', name: 'Std Deviation', description: 'Statistics', icon: BarChart3 },
    { id: 'trigonometry', name: 'Trigonometry', description: 'Sin, cos, tan', icon: Calculator },
    { id: 'bmi-zscore', name: 'BMI Z-Score', description: 'Statistical BMI', icon: BarChart3 },
    { id: 'coefficient', name: 'Coefficient', description: 'Variation coeff', icon: BarChart3 },
    { id: 'correlation', name: 'Correlation', description: 'Relationship strength', icon: TrendingUp },
    { id: 'covariance', name: 'Covariance', description: 'Joint variability', icon: BarChart3 },
    { id: 'cross-product', name: 'Cross Product', description: 'Vector product', icon: Calculator },
    { id: 'derivative', name: 'Derivative', description: 'Rate of change', icon: TrendingUp },
    { id: 'eigenvalue', name: 'Eigenvalue', description: 'Matrix analysis', icon: Square },
    { id: 'geometric-mean', name: 'Geometric Mean', description: 'Average rate', icon: BarChart3 },
    { id: 'harmonic-mean', name: 'Harmonic Mean', description: 'Rates average', icon: BarChart3 },
    { id: 'inverse-matrix', name: 'Inverse Matrix', description: 'Matrix inverse', icon: Square },
    { id: 'linear-regression', name: 'Linear Regression', description: 'Best fit line', icon: TrendingUp },
    { id: 'modulo', name: 'Modulo', description: 'Remainder calc', icon: Hash },
    { id: 'nth-root', name: 'Nth Root', description: 'Any root', icon: Square },
    { id: 'polynomial', name: 'Polynomial', description: 'Root finder', icon: Calculator }
  ]},
  { id: 'datetime', name: 'Date & Time', icon: Calendar, color: 'from-amber-500 to-orange-500', calculators: [
    { id: 'date-difference', name: 'Date Difference', description: 'Days between dates', icon: Calendar },
    { id: 'add-subtract-days', name: 'Add/Subtract Days', description: 'Modify dates', icon: Calendar },
    { id: 'time-difference', name: 'Time Difference', description: 'Hours between', icon: Clock },
    { id: 'age', name: 'Age Calculator', description: 'Calculate age', icon: Calendar },
    { id: 'weekday-finder', name: 'Weekday Finder', description: 'Day of week', icon: Calendar },
    { id: 'countdown', name: 'Countdown', description: 'Days until date', icon: Timer },
    { id: 'working-days', name: 'Working Days', description: 'Business days', icon: Calendar },
    { id: 'time-zone', name: 'Time Zone', description: 'Convert zones', icon: Globe },
    { id: 'epoch', name: 'Epoch Converter', description: 'Unix timestamp', icon: Clock },
    { id: 'duration', name: 'Duration', description: 'Convert durations', icon: Timer },
    { id: 'leap-year', name: 'Leap Year', description: 'Check leap year', icon: Calendar },
    { id: 'add-months', name: 'Add Months', description: 'Date arithmetic', icon: Calendar },
    { id: 'quarter', name: 'Quarter', description: 'Fiscal quarter', icon: Calendar },
    { id: 'week-number', name: 'Week Number', description: 'Week of year', icon: Calendar },
    { id: 'days-until-birthday', name: 'Days Until Birthday', description: 'Birthday countdown', icon: Calendar },
    { id: 'meeting-duration', name: 'Meeting Duration', description: 'Calculate length', icon: Clock },
    { id: 'daylight-hours', name: 'Daylight Hours', description: 'Daylight', icon: Sun },
    { id: 'decimal-time', name: 'Decimal Time', description: 'Convert time', icon: Clock },
    { id: 'world-clock', name: 'World Clock', description: 'Time worldwide', icon: Globe },
    { id: 'time-elapsed', name: 'Time Elapsed', description: 'Time since', icon: Timer },
    { id: 'date-range', name: 'Date Range', description: 'Generate dates', icon: Calendar },
    { id: 'zodiac-sign', name: 'Zodiac Sign', description: 'Find your sign', icon: Star },
    { id: 'lunar-age', name: 'Lunar Age', description: 'Chinese calendar', icon: Moon },
    { id: 'pet-age', name: 'Pet Age', description: 'Pet years', icon: Heart },
    { id: 'age-difference', name: 'Age Difference', description: 'Compare ages', icon: Calendar },
    { id: 'calendar-generator', name: 'Calendar Generator', description: 'Create calendar', icon: Calendar },
    { id: 'date-add-year', name: 'Add Years', description: 'Year arithmetic', icon: Calendar },
    { id: 'date-compare', name: 'Date Compare', description: 'Compare dates', icon: Calendar },
    { id: 'date-fraction', name: 'Date Fraction', description: 'Decimal dates', icon: Clock },
    { id: 'holiday-date', name: 'Holiday Date', description: 'Find holidays', icon: Star },
    { id: 'julian-date', name: 'Julian Date', description: 'JD converter', icon: Globe },
    { id: 'moon-phase', name: 'Moon Phase', description: 'Lunar phase', icon: Moon },
    { id: 'pregnancy-weeks', name: 'Pregnancy Weeks', description: 'Week calculator', icon: Heart },
    { id: 'school-year', name: 'School Year', description: 'Academic year', icon: Calendar },
    { id: 'sidereal-time', name: 'Sidereal Time', description: 'Star time', icon: Globe },
    { id: 'sun-position', name: 'Sun Position', description: 'Sun angle', icon: Sun },
    { id: 'anniversary', name: 'Anniversary', description: 'Years together', icon: Heart },
    { id: 'biorhythm', name: 'Biorhythm', description: 'Body cycles', icon: Activity },
    { id: 'business-days-add', name: 'Add Business Days', description: 'Skip weekends', icon: Calendar },
    { id: 'calendar-week', name: 'Calendar Week', description: 'Week number', icon: Calendar },
    { id: 'date-format', name: 'Date Format', description: 'Format converter', icon: FileText },
    { id: 'days-in-month', name: 'Days in Month', description: 'Month length', icon: Calendar },
    { id: 'days-until-summer', name: 'Days Until Summer', description: 'Season countdown', icon: Sun },
    { id: 'earth-age', name: 'Earth Age', description: 'Days on Earth', icon: Globe },
    { id: 'fiscal-year', name: 'Fiscal Year', description: 'Business year', icon: Calendar },
    { id: 'gregorian-julian', name: 'Gregorian-Julian', description: 'Calendar convert', icon: Globe },
    { id: 'hours-worked', name: 'Hours Worked', description: 'Time tracking', icon: Clock },
    { id: 'iso-week', name: 'ISO Week', description: 'ISO week num', icon: Calendar },
    { id: 'next-holiday', name: 'Next Holiday', description: 'Upcoming holiday', icon: Star },
    { id: 'time-card', name: 'Time Card', description: 'Work hours', icon: Timer }
  ]},
  { id: 'tools', name: 'Tools', icon: Wrench, color: 'from-cyan-500 to-blue-500', calculators: [
    { id: 'temperature', name: 'Temperature', description: 'Convert temps', icon: ThermometerIcon },
    { id: 'length-converter', name: 'Length', description: 'Convert length', icon: Ruler },
    { id: 'weight-converter', name: 'Weight', description: 'Convert weight', icon: Weight },
    { id: 'volume-converter', name: 'Volume', description: 'Convert volume', icon: Droplets },
    { id: 'area-converter', name: 'Area', description: 'Convert area', icon: Square },
    { id: 'speed-converter', name: 'Speed', description: 'Convert speed', icon: Wind },
    { id: 'fuel-economy', name: 'Fuel Economy', description: 'MPG conversion', icon: Car },
    { id: 'data-storage', name: 'Data Storage', description: 'Convert data', icon: HardDriveIcon },
    { id: 'color-converter', name: 'Color Converter', description: 'HEX/RGB/HSL', icon: PaletteIcon },
    { id: 'password-generator', name: 'Password Gen', description: 'Secure passwords', icon: Shield },
    { id: 'random-number', name: 'Random Number', description: 'Generate numbers', icon: Hash },
    { id: 'text-counter', name: 'Text Counter', description: 'Count chars', icon: FileText },
    { id: 'case-converter', name: 'Case Converter', description: 'Convert case', icon: FileText },
    { id: 'binary', name: 'Binary', description: 'Base conversion', icon: Hash },
    { id: 'roman-numeral', name: 'Roman Numeral', description: 'Convert numerals', icon: Hash },
    { id: 'qr-data', name: 'QR Data', description: 'QR generation', icon: Hash },
    { id: 'unit-rate', name: 'Unit Rate', description: 'Price per unit', icon: Calculator },
    { id: 'proportion', name: 'Proportion', description: 'Solve ratios', icon: Divide },
    { id: 'gcd-lcm', name: 'GCD & LCM', description: 'Both together', icon: Hash },
    { id: 'energy', name: 'Energy', description: 'Convert energy', icon: Zap },
    { id: 'angle', name: 'Angle', description: 'Degrees/radians', icon: Target },
    { id: 'pressure', name: 'Pressure', description: 'Convert pressure', icon: Wind },
    { id: 'frequency', name: 'Frequency', description: 'Convert frequency', icon: Timer },
    { id: 'base64', name: 'Base64', description: 'Encode/decode', icon: FileText },
    { id: 'bmi-for-age', name: 'BMI for Age', description: 'Child BMI', icon: Activity },
    { id: 'clothing-size', name: 'Clothing Size', description: 'Size converter', icon: Ruler },
    { id: 'density', name: 'Density', description: 'Mass/volume', icon: Weight },
    { id: 'force', name: 'Force', description: 'Force units', icon: Zap },
    { id: 'illuminance', name: 'Illuminance', description: 'Light units', icon: Sun },
    { id: 'luminance', name: 'Luminance', description: 'Brightness', icon: Sun },
    { id: 'magnetic-field', name: 'Magnetic Field', description: 'Field strength', icon: Target },
    { id: 'power', name: 'Power', description: 'Power units', icon: Zap },
    { id: 'torque', name: 'Torque', description: 'Rotation force', icon: Wrench },
    { id: 'viscosity', name: 'Viscosity', description: 'Fluid thickness', icon: Droplets },
    { id: 'voltage', name: 'Voltage', description: 'Electric potential', icon: Zap },
    { id: 'acceleration', name: 'Acceleration', description: 'Speed change', icon: Zap },
    { id: 'area-perimeter', name: 'Area/Perimeter', description: 'Shape calc', icon: Square },
    { id: 'aspect-ratio', name: 'Aspect Ratio', description: 'Screen ratio', icon: Target },
    { id: 'bandwidth', name: 'Bandwidth', description: 'Data transfer', icon: Globe },
    { id: 'bitwise', name: 'Bitwise', description: 'Bit operations', icon: Hash },
    { id: 'color-contrast', name: 'Color Contrast', description: 'WCAG check', icon: PaletteIcon },
    { id: 'css-units', name: 'CSS Units', description: 'Web units', icon: Ruler },
    { id: 'dns-lookup', name: 'DNS Lookup', description: 'Domain info', icon: Globe },
    { id: 'escape-unescape', name: 'Escape/Unescape', description: 'String escape', icon: FileText },
    { id: 'file-size', name: 'File Size', description: 'Size converter', icon: HardDriveIcon },
    { id: 'hex-decimal', name: 'Hex/Decimal', description: 'Base convert', icon: Hash },
    { id: 'image-resize', name: 'Image Resize', description: 'Dimensions', icon: Square },
    { id: 'ip-address', name: 'IP Address', description: 'IP info', icon: Globe },
    { id: 'pixel-density', name: 'Pixel Density', description: 'DPI calculator', icon: Target }
  ]}
]

// Calculator Form Component
function CalculatorForm({ calculatorId }: { calculatorId: string }) {
  const config = allCalculatorConfigs[calculatorId]
  const [inputs, setInputs] = useState<Record<string, string>>({})
  const [result, setResult] = useState<ReturnType<CalculatorConfig['calculate']> | null>(null)
  const { toast } = useToast()

  if (!config) {
    return (
      <div className="p-6 text-center">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="font-medium">Calculator not found</p>
        <p className="text-sm text-muted-foreground">Please try another calculator.</p>
      </div>
    )
  }

  const handleCalculate = () => {
    try {
      const res = config.calculate(inputs)
      if (res.results.length === 0) {
        toast({ title: 'Please fill in all required fields', variant: 'destructive' })
      }
      setResult(res)
    } catch (error) {
      toast({ title: 'Calculation error', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 p-4 rounded-xl border">
        <p className="text-sm text-muted-foreground">{config.longDescription}</p>
      </div>

      <div className="space-y-3">
        {config.inputs.map((input) => (
          <div key={input.id} className="space-y-2">
            <Label htmlFor={input.id} className="text-sm font-medium">{input.label}</Label>
            {input.type === 'select' ? (
              <Select value={inputs[input.id] || ''} onValueChange={(v) => setInputs(prev => ({ ...prev, [input.id]: v }))}>
                <SelectTrigger className="bg-background/80 border-2 focus:border-primary">
                  <SelectValue placeholder={input.placeholder || 'Select...'} />
                </SelectTrigger>
                <SelectContent>
                  {input.options?.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id={input.id}
                type={input.type || 'text'}
                value={inputs[input.id] || ''}
                onChange={(e) => setInputs(prev => ({ ...prev, [input.id]: e.target.value }))}
                placeholder={input.placeholder}
                className="bg-background/80 border-2 focus:border-primary"
              />
            )}
          </div>
        ))}
        <Button onClick={handleCalculate} className="w-full bg-gradient-to-r from-primary to-primary/80">
          <Sparkles className="h-4 w-4 mr-2" />
          Calculate
        </Button>
      </div>

      {result && result.results.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pt-4 border-t">
          <h3 className="font-semibold flex items-center gap-2"><Target className="h-4 w-4 text-primary" /> Results</h3>
          
          <div className="grid gap-3">
            {result.results.map((r, i) => (
              <ResultDisplay key={i} label={r.label} value={r.value} unit={r.unit} highlight={r.highlight} description={r.description} icon={r.icon} />
            ))}
          </div>

          {result.pieData && result.pieData.length > 0 && (
            <div className="bg-muted/30 p-4 rounded-xl border">
              <h4 className="font-medium mb-3 flex items-center gap-2"><PieChartIcon className="h-4 w-4 text-violet-500" /> Visual Breakdown</h4>
              <PieChart3D data={result.pieData} />
            </div>
          )}

          {result.formula && <FormulaDisplay formula={result.formula.formula} explanation={result.formula.explanation} steps={result.formula.steps} />}

          {result.comparisons && result.comparisons.length > 0 && (
            <div className="bg-muted/30 p-4 rounded-xl border space-y-3">
              <h4 className="font-medium flex items-center gap-2"><BarChart3 className="h-4 w-4 text-amber-500" /> Comparison</h4>
              {result.comparisons.map((comp, i) => <ComparisonBar key={i} label={comp.label} value={comp.value} max={comp.max} color={comp.color} unit={comp.unit} />)}
            </div>
          )}

          {result.infoCards && result.infoCards.map((card, i) => <InfoCard key={i} title={card.title} content={card.content} variant={card.variant} />)}
        </motion.div>
      )}
    </div>
  )
}

// AI Chat Component
function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Hello! I\'m CalciLab AI. How can I help with calculations?' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: userMessage, history: messages }) })
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, an error occurred.' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <motion.button className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-2xl flex items-center justify-center" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(true)}>
        <Brain className="h-7 w-7" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 100, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 100, scale: 0.9 }} className="fixed bottom-28 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[70vh] bg-background rounded-3xl shadow-2xl border flex flex-col overflow-hidden">
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"><Brain className="h-5 w-5" /></div>
                <div><h3 className="font-semibold">CalciLab AI</h3><p className="text-xs opacity-80">Ask me anything</p></div>
              </div>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-xl" onClick={() => setIsOpen(false)}><X className="h-5 w-5" /></Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-br-md' : 'bg-muted rounded-bl-md'}`}>{msg.content}</div>
                </div>
              ))}
              {isLoading && <div className="flex justify-start"><div className="bg-muted p-3 rounded-2xl rounded-bl-md"><div className="flex gap-1">
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div></div></div>}
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input placeholder="Type your question..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} className="flex-1 rounded-xl" />
                <Button onClick={sendMessage} disabled={isLoading} className="rounded-xl"><ArrowRight className="h-4 w-4" /></Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Main App Component
export default function CalculatorHub() {
  const [selectedCategory, setSelectedCategory] = useState('health')
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const currentCategory = categories.find(c => c.id === selectedCategory)!
  const filteredCalculators = currentCategory.calculators.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase()))
  const totalCalculators = categories.reduce((sum, cat) => sum + cat.calculators.length, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
              <motion.div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 via-cyan-500 to-emerald-500 p-[3px] shadow-xl"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                  <span className="text-2xl font-black bg-gradient-to-br from-pink-500 via-purple-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">C</span>
                </div>
              </motion.div>
              <div>
                <h1 className="text-3xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-pink-500 via-purple-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent animate-pulse">Calci</span>
                  <span className="bg-gradient-to-r from-emerald-500 via-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Lab</span>
                </h1>
                <p className="text-xs text-muted-foreground font-medium">{totalCalculators}+ Professional Calculators</p>
              </div>
            </motion.div>

            <nav className="hidden lg:flex items-center gap-2">
              {categories.map((cat) => (
                <motion.div key={cat.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant={selectedCategory === cat.id ? 'default' : 'ghost'} size="sm" onClick={() => setSelectedCategory(cat.id)} className={`flex items-center gap-2 rounded-xl ${selectedCategory === cat.id ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg' : ''}`}>
                    <cat.icon className="h-4 w-4" />
                    <span className="hidden xl:inline">{cat.name}</span>
                    <Badge variant="secondary" className="ml-1 text-xs">{cat.calculators.length}</Badge>
                  </Button>
                </motion.div>
              ))}
            </nav>

            <Button variant="ghost" size="icon" className="lg:hidden rounded-xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}><Menu className="h-5 w-5" /></Button>
          </div>

          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="lg:hidden pt-4 pb-2 space-y-2">
              {categories.map((cat) => (
                <Button key={cat.id} variant={selectedCategory === cat.id ? 'default' : 'ghost'} size="sm" onClick={() => { setSelectedCategory(cat.id); setMobileMenuOpen(false) }} className={`w-full justify-start rounded-xl ${selectedCategory === cat.id ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white' : ''}`}>
                  <cat.icon className="h-4 w-4 mr-2" />{cat.name}
                  <Badge variant="secondary" className="ml-auto">{cat.calculators.length}</Badge>
                </Button>
              ))}
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-purple-600/5 to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4">
            Your All-in-One
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"> Calculator Hub</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Access {totalCalculators}+ powerful calculators for health, finance, math, date & time, and everyday tools.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder={`Search ${currentCategory.name} calculators...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-12 h-12 rounded-2xl border-2 shadow-lg" />
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Category Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-4 rounded-2xl cursor-pointer transition-all shadow-lg ${selectedCategory === cat.id ? `bg-gradient-to-br ${cat.color} text-white shadow-xl` : 'bg-card border hover:shadow-xl'}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedCategory === cat.id ? 'bg-white/20' : `bg-gradient-to-br ${cat.color}`}`}>
                  <cat.icon className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium text-sm">{cat.name}</span>
              </div>
              <p className="text-2xl font-bold">{cat.calculators.length}</p>
              <p className="text-xs opacity-80">Calculators</p>
            </motion.div>
          ))}
        </div>

        {/* Calculator Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCalculators.map((calc, index) => (
            <motion.div
              key={`${calc.id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.02, 0.3) }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCalculator(calc.id)}
              className="cursor-pointer"
            >
              <Card className="h-full hover:shadow-2xl transition-all border-2 hover:border-primary/50 bg-gradient-to-br from-card to-card/50 group">
                <CardHeader className="pb-2">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentCategory.color} flex items-center justify-center mb-2 shadow-lg group-hover:scale-110 transition-transform`}>
                    <calc.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-base group-hover:text-primary transition-colors">{calc.name}</CardTitle>
                  <CardDescription className="text-sm">{calc.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    <span>Open</span>
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-cyan-500/5 border-t mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 flex items-center justify-center p-[2px]">
                <div className="w-full h-full rounded-md bg-background flex items-center justify-center">
                  <span className="text-xs font-black bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">C</span>
                </div>
              </div>
              <span className="font-black text-lg">
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">Calci</span>
                <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Lab</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">© 2026 CalciLab. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Calculator Dialog */}
      <Dialog open={!!selectedCalculator} onOpenChange={() => setSelectedCalculator(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl">
          {selectedCalculator && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{allCalculatorConfigs[selectedCalculator]?.name || 'Calculator'}</DialogTitle>
                <DialogDescription>{allCalculatorConfigs[selectedCalculator]?.description || ''}</DialogDescription>
              </DialogHeader>
              <CalculatorForm calculatorId={selectedCalculator} />
            </>
          )}
        </DialogContent>
      </Dialog>

      <AIChatAssistant />
      <Toaster />
    </div>
  )
}
